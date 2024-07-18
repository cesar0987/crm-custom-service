import "./InventoryChart.css";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const InventoryChart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dataCatch = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataCatch();
  }, []);

  console.log("PRODUCTS", products);

  //Guardar la cantidad de productos segun su nombre
  let productCount = {};
  products.forEach((product) => {
    if (productCount[product.name]) {
      productCount[product.name] += product.quantity;
    } else {
      productCount[product.name] = product.quantity;
    }
  });

  console.log("PRODUCT COUNT", productCount);

  let data = [];
  for (const key in productCount) {
    data.push({
      label: key,
      value: productCount[key],
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      cutout: 70,
    });
  }

  const options = {
    plugins: {
      responsive: true,
    },
    cutout: data.map((item) => item.cutout),
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  return <Doughnut data={finalData} options={options} />;
};
