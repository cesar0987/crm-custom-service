import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import {
  Dashboard,
  Help,
  Inventory,
  Login,
  Register,
  Reports,
  SalesOrder,
  Settings,
  Supliers,
  Home
} from "pages";
import { Layout } from "components";
import { AddProduct } from "components";

function App () {
  const App = () => {
  useEffect(() => {
    document.title = "CRM";
  });
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/salesorder" element={<SalesOrder/>} />
          <Route path="/supliers" element={<Supliers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Dashboard />} />

          <Route path="/addProduct" element={<AddProduct addProduct={addProduct}/>} />

        </Routes>
      </Layout>
    </div>
  );
};

export default App;
