import "./Header.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export const Header = () => {
  const location = useLocation();
  const [exchangeMoney, setExchangeMoney] = useState([]);
  const handleExchangeMoney = async (e) => {
    const URL = "https://www.cambioschaco.com.py/api/branch_office/1/exchange";
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setExchangeMoney(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleExchangeMoney();
  }, []);

  console.log("Exchange Money:", exchangeMoney);

  console.log(location);
  return (
    <div className="headerContainer">
      <div className="headerTitle">
        <h1>Terracota Shoes</h1>
        <h2>Inventory Management System</h2>
      </div>
   {/*    <div className="headerExchange">
        <h3>Exchange Money</h3>
        <div className="purchase">
          <p>USD: {exchangeMoney[0]?.purchasePrice}Gs</p>
          <p>EUR: {exchangeMoney[1]?.purchasePrice}Gs</p>
          <p>ARS: {exchangeMoney[2]?.purchasePrice}Gs</p>
        </div>
        <div className="sale">
          <p>USD: {exchangeMoney[0]?.salePrice}Gs</p>
          <p>EUR: {exchangeMoney[1]?.salePrice}Gs</p>
          <p>ARS: {exchangeMoney[2]?.salePrice}Gs</p>
        </div>
      </div>  */}
      <form>
        {location.pathname === "/" ? (
          <>
            {" "}
            <input type="text" placeholder="Search" />{" "}
            <button type="submit">Search</button>
          </>
        ) : null}
      </form>
    </div>
  );
};
