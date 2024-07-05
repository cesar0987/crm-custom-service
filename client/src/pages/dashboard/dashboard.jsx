import { AvatarSection, QuickActions, BarChart } from "components";
import { useEffect, useState } from "react";
import "./dashboard.css";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProducts = async () => {
    try {
      setLoading(true);
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
    fetchProducts();
  }, []);

  console.log("Products", products);
  const countProducts = () => {
    let count = 0;
    products.map((product) => {
      console.log("Product quantity", product.quantity);
      count += Number(product.quantity);
      return count;
    });
    return count;
  };

  console.log("Products quantity", countProducts());
  return (
    <div className="dashboardContainer">
      <div className="leftPanel">
        <div className="salesSumary">
          <span>
            <b>Today Sales</b>
          </span>
          <span>
            <b>Yearly Total Sales</b>
          </span>
          <span>
            <b>Net Income</b>
          </span>
          <span>
            <b>Product</b>
            <p>{countProducts()}</p>
          </span>
        </div>
        <div className="salesReport">
          <span>
            <b>Sales Report</b>
            <p></p>
          </span>
          <span className="barChartDashboard">
            <BarChart />
          </span>
        </div>
        <div className="salesOrderDashboard">
          <span>
            <b>Sales Order</b>
          </span>
          <table>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Product 1</td>
                <td>1000</td>
                <td>10</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Product 2</td>
                <td>2000</td>
                <td>20</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Product 3</td>
                <td>3000</td>
                <td>30</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Product 4</td>
                <td>4000</td>
                <td>40</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Product 5</td>
                <td>5000</td>
                <td>50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="rightPanel">
        <AvatarSection />
        <QuickActions />
        <div className="FastMovingProducts">
          <span>
            <b>Fast Moving Products</b>
          </span>
          <table>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};
