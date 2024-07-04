import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import { AvatarSection, InventorySearchBar, QuickActions } from "components";

export const AddProduct = ({ addProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [ref, setRef] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const procesarForm = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:8000/api/create/product";
    const configuracion = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        ref,
        price,
        quantity,
        size,
        color,
        brand,
        date,
      }),
    };

    const respuesta = await fetch(URL, configuracion);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      console.log(datos);
      setError(datos.message);
    } else {
      addProduct(datos);
      setName("");
      setDescription("");
      setRef("");
      setColor("");
      setDate("");
      setPrice(0);
      setQuantity(0);
      setSize("");
      setBrand("");
      setError("");
      navigate("/inventory");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const mostRecentActivity = products.slice(0, 4);

  return (
    <div className="addContainer">
      <div className="addProductWrapper">
        <div className="addProductContainer">
          <h1 className="addProductTitle"> Add Product </h1>
          <form onSubmit={procesarForm} className="addProductForm">
            <div className="formGroup">
              <label> Name: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label> Price: </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label> Quantity: </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label> Size: </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label> Brand: </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label> Description: </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label> Reference: </label>
              <input
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label> Color: </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label> Date: </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <button type="submit"> Add Product </button>
            </div>
          </form>
          {error && <p className="errorMessage">{error}</p>}
        </div>
      </div>
      <div className="rightPanel">
        <AvatarSection />
        <QuickActions />
        <div className="recentActivity">
          <span>
            <b>Recent Activity</b>
          </span>
          <div className="actionDate">
            <div className="details">
              <h2 className="titles"> Action </h2>
              {mostRecentActivity.map((product) => (
                <p key={product.ref} className="productsDetails">
                  <h3 className="nameDetail">{product.name}</h3>
                </p>
              ))}
            </div>
            <div className="details">
              <h2 className="titles"> Date </h2>
              {mostRecentActivity.map((product) => (
                <p key={product.ref} className="productsDetails">
                  <h3 className="nameDetail">{formatDate(product.date)}</h3>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
