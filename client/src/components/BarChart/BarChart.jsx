import "./BarChart.css";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
);

export const BarChart = () => {
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

  //Guardar la cantidad en total de productos
  let productCountOrder = 0;
  products.forEach((product) => {
    productCountOrder += product.quantity;
  });

  let productCountSales = 0;
  products.forEach((product) => {
    if (product.quantity === 0) {
      productCountSales += 1;
    } 
  });
  const optionsChart = {};

  const dataChart = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, productCountSales],
        backgroundColor: "rgb(0, 255, 255)",
        border: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Orders",
        data: [28, 48, 40, 19, 86, 27, productCountOrder],
        backgroundColor: "rgb(255, 99, 132)",
        border: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <div className="barChart">
      <Bar data={dataChart} options={optionsChart} />
    </div>
  );
};
