import { Text, View } from "react-native";
import React from "react";
import { useEffect, useState } from 'react';
import {
  LineChart,
} from 'react-native-chart-kit';

import CustomButton from '../../components/CustomButton';




const ChartDisplay =() => {

  const [toggle, setToggle] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [text, setText] = useState("Show Humidity");
  const [Title , setTitle]=useState("Temperature Line Chart");
  const [ySuffix,setySuffix]=useState("C");
  let [sec , setSec] = useState(0);
  const dataURL = "http://localhost:5000/";
  let d;

  const toggleHandler = () => {
    setToggle(!toggle);
    setText(toggle ? "Show Humidity" : "Show Temp");
    setTitle(toggle ? "Temperature Line Chart" : "Humidity Line Chart");
    setySuffix(toggle ? "C" : "%");
  };
  
  // setInterval(() =>{
  //   setSec(sec = sec+1)
  // }, 1000)


  useEffect(() => {
    console.log("j")
    fetch(dataURL)
      .then((response) => console.log(response)) // get response, convert to json
      .then((json) => {
       
        d = toggle ? json.data.Temperature_C : json.data.Humadity;
        setChartData(d); 
        console.log(json.data)
      })
      .catch((error) => alert(error)) // display errors
  }, []);

 // console.log("chartData" , chartData); 

    return(
      <View>
        <Text style={{
          marginVertical:70,
          fontSize:30,
          textAlign:"center",
          fontWeight:"bold"
        }}>{Title}</Text>
        <LineChart
          data={{
            labels: [1,2,3,4],
            datasets: [
              {
                yAxisID:'Temp',
                data: chartData.map(x => x)
              }
            ]
          }}
          width={300} // from react-native
          height={400}
          yAxisSuffix={ySuffix}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginLeft:35,
            borderRadius: 16
          }}
          
        />
        <CustomButton title={text} clickHandle={toggleHandler} />
      </View>
    );
}

export default ChartDisplay