
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AddProduct, SuplierForm, SupliersEdit, Layout } from "components";
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
  SuplierForm,
  Home,
<<<<<<< HEAD
  UpdateProductPage,
} from "pages";
import { Layout } from "components";
import { AddProduct} from "components";
=======
  ProtectedRoutes,
} from "pages";
>>>>>>> origin/development

const App = () => {
  useEffect(() => {
    document.title = "CRM";
  });
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };
<<<<<<< HEAD
=======

>>>>>>> origin/development
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/salesorder" element={<SalesOrder />} />
          <Route path="/supliers" element={<Supliers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
          <Route path="*" element={<Dashboard />} />

          <Route path="/agregar/supliers" element={<SuplierForm />} />

          <Route
            path="/addProduct"
            element={<AddProduct addProduct={addProduct} />}
          />

=======
          <Route element={<ProtectedRoutes />}>
            <Route path="/agregar/supliers" element={<SuplierForm />} />
            <Route path="/editar/supliers" element={<SupliersEdit />} />
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
>>>>>>> origin/development
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
