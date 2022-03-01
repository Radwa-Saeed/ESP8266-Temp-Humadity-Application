import React from "react";
import { Line } from "react-chartjs-2";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph(props) {
  console.log(props.data);
  let label = [];
  props.data.map((myArr, index) => {
    label.push(index);
  });

  return (
    <div className={styles.graph}>
      <Line
        data={{
          /*  labels: props.data.map((x, index) => index), */
          labels: label,

          datasets: [
            {
              data: props.data,
              borderColor: "#8a2be2",
              label: props.tittle,
              backgroundColor: "#8a2be2",
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: props.tittle,
              font: {
                size: 35,
              },
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Time",
                color: "#8a2be2",
                font: {
                  size: 25,
                },
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: props.tittle,
                color: "#8a2be2",
                font: {
                  size: 25,
                },
              },
            },
          },
        }}
        yAxisSuffix="C"
        yAxisInterval={1} // optional, defaults to 1
      />
    </div>
  );
}

export default Graph;
