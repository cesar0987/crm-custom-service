import "./App.css";
import { Routes, Route } from "react-router-dom";
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
} from "pages";
import SuplierForm from "pages/supliersForm/SuplierForm";
import { Layout } from "components";
function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/salesorder" element={<SalesOrder />} />
          <Route path="/supliers" element={<Supliers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Dashboard />} />
          <Route path="/agregar/supliers" element={<SuplierForm />} />
        </Routes>
      </Layout>

      {/* Add a Routes component with the following routes: */}
    </div>
  );
}

export default App;