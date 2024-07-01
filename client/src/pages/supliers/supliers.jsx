import '../supliers/supliers.css';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export const Supliers = () => {
  const [supliers, setSuplier] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupliers = async () => {
      try {
        setLoaded(true);
        const response = await fetch("http://localhost:8000/api/supliers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setSuplier(data);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(false);
      }
    };

    fetchSupliers();
  }, []);

  if (loaded) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="supliersContainer">
      <h1>Supliers</h1>

      <div >
        <Link to='/agregar/supliers'>
        <button className='btn'>
          Add Supliers
        </button>
        </Link>

      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>RUC</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Mail</th>
            <th>Postal Code</th>
            <th>Sitio Web</th>
          </tr>
        </thead>
        <tbody>
          {supliers.map((suplier, index) => (
            <tr key={index}>
              <td>{suplier.name}</td>
              <td>{suplier.ruc}</td>
              <td>{suplier.phone}</td>
              <td>{suplier.address}</td>
              <td>{suplier.mail}</td>
              <td>{suplier.postalCode}</td>
              <td>{suplier.sitioWep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
