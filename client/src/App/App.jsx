import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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
  Home,
  ProtectedRoutes,
} from "pages";
import SuplierForm from "components/supliersForm/SuplierForm";
import SupliersEdit from "components/SupliersEdit/SupliersEdit";
import { Layout } from "components";
import { AddProduct, SuplierForm } from "components";

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
          <Route path="/welcome" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/salesorder" element={<SalesOrder />} />
              <Route path="/supliers" element={<Supliers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/help" element={<Help />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Dashboard />} />
              <Route path="/addProduct" element={<AddProduct addProduct={addProduct} />} />

          <Route path="*" element={<Dashboard />} />

          <Route path="/agregar/supliers" element={<SuplierForm />} />
          <Route path="/actualizar/supliers/:id" element={<SupliersEdit />} />

          <Route
            path="/addProduct"
            element={<AddProduct addProduct={addProduct} />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route path="/agregar/supliers" element={<SuplierForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/salesorder" element={<SalesOrder />} />
            <Route path="/supliers" element={<Supliers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
            <Route
              path="/addProduct"
              element={<AddProduct addProduct={addProduct} />}
            />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
        
      </Layout>
    </div>
  );
};

export default App;
