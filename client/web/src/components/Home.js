import React from "react";
import { useEffect, useState } from "react";
import Graph from "./Graph";
import styles from "./styles.module.css";

function Home() {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("Show Temp");
  const [chartData, setChartData] = useState([]);
  const [tittle, setTittle] = useState("Pressure");
  let data;

  const dataURL = "http://localhost:5000/";
  useEffect(() => {
    fetch(dataURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
       // data = toggle ? json.Temperature_C : json.Humadity;
        //setChartData(data);
        console.log(json);
        console.log("hi");
      })
      .catch((error) => alert(error)); // display errors
  }, [toggle]);
  const toggleHandler = () => {
    setToggle(!toggle);
    setText(toggle ? "Show Temp" : "Show Pressure");
    setTittle(toggle ? "Pressure" : "Temp");
    //console.log(0);
  };
  //console.log(data);
  //setInterval(useEffect, 1000);
  console.log("chartData", chartData);
  console.log(toggle);

  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <Graph data={chartData} tittle={tittle} />
      </div>
      <div className={styles.col2}>
        <button className={styles.button} onClick={toggleHandler}>
          {text}
        </button>
      </div>
    </div>
  );
}

export default Home;
