
import React, { useState, useEffect } from "react";
import Next from "Assets/Next.svg"
import Previous from "Assets/Previous.svg"
import "./inventory.css";
import { AvatarSection, InventorySearchBar, QuickActions } from "components";
import { useNavigate } from "react-router-dom";

export const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  //
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const mostRecentActivity = products.slice(0, 4);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="inventoryContainer">
      <div className="leftPanel">
        <InventorySearchBar setSearchResultados={setProducts} />
        <div className="productList">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ref</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.ref}>
                  <td>{product.name}</td>
                  <td>{product.ref}</td>
                  <td>{formatPrice(product.price)} Gs</td>
                  <td>{product.quantity}</td>
                  <td>
                    <div>
                      <button  onClick={() => navigate(`/update-product/${product._id}`)}>Edit</button>
                    </div>
                    <div>
                      <button>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pageInfo">
            {currentPage} / {totalPages}
          </div>
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1} >
              <img src={Previous} className="pages" alt="Previous" />
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === totalPages
              } >
              <img src={Next} className="pages" alt="Next" />
            </button>
          </div>
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
