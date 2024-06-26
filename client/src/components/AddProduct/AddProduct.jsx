import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const procesarForm = async (e) => {
    e.preventDefault();
    const URL = 'http://localhost:8000/api/create/product';
    const configuracion = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
        date
      })
    }

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
  }

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={procesarForm}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div>
          <label>Size:</label>
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
        </div>
        <div>
          <label>Brand:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Reference:</label>
          <input type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
        </div>
        <div>
          <label>Color:</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <button type="submit">Add Product</button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
