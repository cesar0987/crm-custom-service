
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../supliersForm/SuplierForm.css';

const SuplierForm = () => {
    const [name, setName] = useState("");
    const [ruc, setRuc] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [sitioWep, setSitioWep]= useState("");
    const [error, setError] = useState("");
    const navegacion = useNavigate();

    const agregarSuplier = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/agregar/supliers', {
            name,
            ruc,
            phone,
            address,
            mail,
            postalCode,
            sitioWep
        })
        .then(res => {
            console.log(res);
            
        })
        .catch(err => console.log(err));
    };

    return(
        <> 
         <div >
            <h1> Agregar Proveedor </h1>
            <form onSubmit={agregarSuplier} className="supplier-form">
            <p>
                <label>Name</label><br/>
                <input type="text" name= "name" placeholder="Nombre"
                onChange={(e) => setName(e.target.value)} value={name} />
            </p>
            <p>
                <label>Ruc</label><br/>
                <input type="text" name= "ruc" placeholder="RUC"
                onChange={(e) => setRuc(e.target.value)} value={ruc} />
            </p>
            <p>
            <label>Phone</label><br/>
                <input type="number" name="phone" placeholder="Telefono" 
                onChange={(e) => setPhone(e.target.value)} value={phone} />
            </p>
            <p>
            <label>Adress</label><br/>
                <input type="text" name="address" placeholder="Direccion" 
                onChange={(e) => setAddress(e.target.value)} value={address} />
            </p>
            <p>
            <label>Mail</label><br/>
                <input type="text" name="mail" placeholder="Correo electronico" 
                onChange={(e) => setMail(e.target.value)} value={mail} />
            </p>
            <p>
            <label>Postal Code</label><br/>
                <input type="number" name="postalCode" placeholder="Codigo Postal" 
                onChange={(e) => setPostalCode(e.target.value)} value={postalCode} />
            </p>
            <p>
            <label>Sitio wep</label><br/>
                <input type="text"  name="sitioWep" placeholder ="Sitio Wep" 
                onChange={(e) => setSitioWep(e.target.value)} value={sitioWep} />
            </p>
            <button>Add</button>
            </form>
            </div>
        </>
    );
}

export default SuplierForm;
