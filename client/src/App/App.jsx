import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AddProduct, SupliersEdit, Layout, SuplierForm } from "components";
import { ProtectedRoutes } from "../pages/utils/ProtectedRoutes";
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
  UpdateProductPage,
} from "pages";

const App = () => {
  useEffect(() => {
    document.title = "CRM";
  }, []);

  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState([]);

  const addProductSelected = (selectedProducts) => {
    setProductSelected(selectedProducts);
  };

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/welcome" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/addProduct"
            element={<AddProduct addProduct={addProduct} />}
          />
          <Route
            path="/update-product/:id"
            element={<UpdateProductPage addProduct={addProduct} />}
          />

          <Route element={<ProtectedRoutes />}>
            <Route path="/editar/supliers" element={<SupliersEdit />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route
              path="/salesorder"
              element={<SalesOrder addProductSelected={addProductSelected} />}
            />
            <Route path="/supliers" element={<Supliers />} />
            <Route
              path="/reports"
              element={<Reports selectedProducts={productSelected} />}
            />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
            <Route path="/actualizar/supliers/:id" element={<SupliersEdit />} />
            <Route path="/agregar/supliers" element={<SuplierForm />} />
            {/*Rutas de busqueda Global*/}
            <Route path="/inventory/:id" element={<Inventory />} />
            <Route path="/supliers/:id" element={<Supliers />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
