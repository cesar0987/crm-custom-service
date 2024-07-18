import "./Header.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../Assets/Logo.png";
import UsFlag from "../../Assets/estados unidos.svg";


// Asegúrate de que las banderas estén en el orden correcto correspondiente a currencyNames

import BrFlag from "../../Assets/Bandera Brasil.png";
import ArFlag from "../../Assets/argentina.svg";
import Modal from "react-modal";

const flags = [UsFlag, BrFlag, ArFlag];
const currencyNames = ["USD", "R$", "ARS"];


export const Header = () => {
  const location = useLocation();
  const [exchangeMoney, setExchangeMoney] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, setProduct] = useState([]);
  const [suplier, setSuplier] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [showSuplier, setShowSuplier] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const positions = [0, 1,2]; // Posiciones deseadas

  const handleExchangeMoney = async () => {
    const URL = "https://www.cambioschaco.com.py/api/branch_office/1/exchange";
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log("API Data:", data); // Verifica la estructura de los datos recibidos
      setExchangeMoney(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleExchangeMoney();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % positions.length); // Cambia a la siguiente posición en el arreglo
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentPos = positions[currentIndex]; // Posición actual en el arreglo de items

  useEffect(() => {
    const imgElement = document.querySelector(".flag");
    const titleChangesMonetaryElement = document.querySelector(
      ".titleChangesMonetary"
    );
    if (imgElement && imgElement.alt === "ARS Flag") {
      titleChangesMonetaryElement.style.gap = "142px";
    } else if (imgElement && imgElement.alt === "USD Flag") {
      titleChangesMonetaryElement.style.gap = "105px";
    } else {
      titleChangesMonetaryElement.style.gap = "160px";
    }
  }, [currentIndex]);

  console.log("Exchange Money:", exchangeMoney);
  console.log("Current Position:", currentPos);

  useEffect(() => {
    const searchGeneral = async () => {
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();
      setProduct(data);
    };

    const searchSuplier = async () => {
      const response = await fetch("http://localhost:8000/api/supliers");
      const data = await response.json();
      setSuplier(data);
    };

    searchGeneral();
    searchSuplier();
  }, []);

  const search = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setShowProduct([]);
      setShowSuplier([]);
    } else {
      const searchProduct = product.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setShowProduct(searchProduct);
      console.log("Producto encontrado:", searchProduct);

      const searchSuplier = suplier.filter((s) =>
        s.name.toLowerCase().includes(value.toLowerCase())
      );
      setShowSuplier(searchSuplier);
      console.log("Suplier encontrado:", searchSuplier);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página
    search(e);
  };

  return (
    <div className="headerContainer">
      <div className="headerTitle">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="headerChangesMonetary">
        <div className="titleChangesMonetary">
          <p> PURCHASE</p>
          <p> SALE</p>
        </div>
        <div className="headerExchange">
          <div className="exchange purchase">
            {exchangeMoney.length > 0 && currentPos < exchangeMoney.length && (
              <p>
                <img
                  className="flag"
                  src={flags[currentPos]}
                  alt={`${currencyNames[currentPos]} Flag`}
                />
                {currencyNames[currentPos]}:{" "}
                {exchangeMoney[currentPos]?.purchasePrice !== undefined
                  ? `${exchangeMoney[currentPos].purchasePrice} Gs`
                  : "Data unavailable"}
              </p>
            )}
          </div>
          <div className="exchange sale">
            {exchangeMoney.length > 0 && currentPos < exchangeMoney.length && (
              <p>
                <img
                  className="flag"
                  src={flags[currentPos]}
                  alt={`${currencyNames[currentPos]} Flag`}
                />
                {currencyNames[currentPos]}:{" "}
                {exchangeMoney[currentPos]?.salePrice !== undefined
                  ? `${exchangeMoney[currentPos].salePrice} Gs`
                  : "Data unavailable"}
              </p>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {location.pathname === "/" ? (
          <>
            <button
              type="button"
              onClick={openModal}
              className="btn btn-primary"
            >
              Search
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Bill Information"
              className="modal"
              overlayClassName="overlay"
            >
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={search}
              />
              <div className="buttons-modal">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
              {showProduct.length > 0 && (
                <div className="searchResult">
                  <table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showProduct.map((p) => (
                        <tr key={p.id}>
                          <td className="fixedWidthName">{p.name}</td>
                          <td className="fixedWidthLink">
                            <Link to={`/inventory/${p.id}`} className="linkItem">
                              View Product
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {showSuplier.length > 0 && (
                <div className="searchResult">
                  <table>
                    <thead>
                      <tr>
                        <th>Supplier Name</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showSuplier.map((s) => (
                        <tr key={s.id}>
                          <td className="fixedWidthName">{s.name}</td>
                          <td className="fixedWidthLink">
                            <Link to={`/supliers/${s.id}`} className="linkItem">
                              View Suplier
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Modal>
          </>
        ) : null}
      </form>
    </div>
  );
};
