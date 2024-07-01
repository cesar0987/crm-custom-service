import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../supliersForm/SuplierForm.css";

export const SuplierForm = () => {
  const [name, setName] = useState("");
  const [ruc, setRuc] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mail, setMail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [sitioWeb, setSitioWeb] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navegacion = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    else if (name.length < 3)
      newErrors.name = "Name must be at least 3 characters long";

    if (!ruc) newErrors.ruc = "RUC is required";

    if (!phone) newErrors.phone = "Phone is required";

    if (!address) newErrors.address = "Address is required";
    else if (address.length < 5)
      newErrors.address = "Address must be at least 5 characters long";

    if (!mail) newErrors.mail = "Mail is required";
    else if (!/.+\@.+\..+/.test(mail))
      newErrors.mail = "Please fill a valid email address";

    if (!postalCode) newErrors.postalCode = "Postal code is required";

    return newErrors;
  };

  const agregarSuplier = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const agregarSuplier = (e) => {
      e.preventDefault();

      axios
        .post("http://localhost:8000/api/agregar/supliers", {
          name,
          ruc,
          phone,
          address,
          mail,
          postalCode,
          sitioWeb,
        })
        .then((res) => {
          console.log(res);
          setName("");
          setRuc("");
          setPhone("");
          setAddress("");
          setMail("");
          setPostalCode("");
          setSitioWeb("");
          setErrors({});
        })
        .catch((err) => {
          console.log(err);
          setErrors({
            api: "An error occurred while adding the supplier. Please try again.",
          });
        });
    };

    return (
      <>
        <div>
          <h1> Agregar Proveedor </h1>
          <form onSubmit={agregarSuplier} className="supplier-form">
            <p>
              <label>Name</label>
              <br />
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </p>
            <p>
              <label>Ruc</label>
              <br />
              <input
                type="text"
                name="ruc"
                placeholder="RUC"
                onChange={(e) => setRuc(e.target.value)}
                value={ruc}
              />
            </p>
            <p>
              <label>Phone</label>
              <br />
              <input
                type="number"
                name="phone"
                placeholder="Telefono"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </p>
            <p>
              <label>Adress</label>
              <br />
              <input
                type="text"
                name="address"
                placeholder="Direccion"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </p>
            <p>
              <label>Mail</label>
              <br />
              <input
                type="text"
                name="mail"
                placeholder="Correo electronico"
                onChange={(e) => setMail(e.target.value)}
                value={mail}
              />
            </p>
            <p>
              <label>Postal Code</label>
              <br />
              <input
                type="number"
                name="postalCode"
                placeholder="Codigo Postal"
                onChange={(e) => setPostalCode(e.target.value)}
                value={postalCode}
              />
            </p>
            <p>
              <label>Sitio web</label>
              <br />
              <input
                type="text"
                name="sitioWeb"
                placeholder="Sitio Web"
                onChange={(e) => setSitioWeb(e.target.value)}
                value={sitioWeb}
              />
            </p>
            <button>Add</button>
          </form>
        </div>
      </>
    );
  };
};
