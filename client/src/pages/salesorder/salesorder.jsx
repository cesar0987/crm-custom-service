import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./salesorder.css";
import Next from "Assets/Next.svg";
import Previous from "Assets/Previous.svg";
import { AvatarSection, QuickActions } from "components";

export const SalesOrder = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [purchased, setPurchased] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.some((p) => p._id === product._id)) {
        return prevSelectedProducts.filter((p) => p._id !== product._id);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name",
      "Price",
      "Description",
      "Quantity",
      "Total Price",
    ];
    const tableRows = [];

    let total = 0;

    // Calcular y agregar filas para el PDF
    selectedProducts.forEach((product) => {
      const quantity = purchased[product._id] || 0;
      const totalPrice = product.price * quantity;

      const productData = [
        product.name,
        formatPrice(product.price),
        product.description,
        quantity,
        formatPrice(totalPrice),
      ];

      tableRows.push(productData);
      total += totalPrice;
    });

    // Generar el PDF con los datos recopilados
    doc.text("Grupo 5", 50, 5);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text(
      `Total: Gs ${total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      14,
      doc.autoTable.previous.finalY + 10
    );

    // Guardar el PDF
    doc.save("grupo5.pdf");

    // Limpiar productos seleccionados después de generar el PDF
    setSelectedProducts([]);

    // Actualizar el stock en el servidor
    updateStock();
  };

  const updateStock = async () => {
    const updatedProducts = selectedProducts.map((product) => ({
      _id: product._id,
      // Asegurarse de enviar la cantidad correcta al servidor
      quantity: product.quantity,
    }));

    try {
      const response = await fetch(
        "http://localhost:8000/api/update/quantity",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProducts),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating stock");
      }
      const data = await response.json();
      setProducts(data); // Actualizar los productos en el estado con los datos recibidos del servidor
    } catch (error) {
      console.log("Failed to update stock:", error);
    }
  };

  const subtractPurchasedProduct = (product, value) => {
    const newQuantity = value ? Math.max(0, Math.min(parseInt(value))) : 0;

    // Actualizar el estado de los productos comprados
    setPurchased({
      ...purchased,
      [product._id]: newQuantity,
    });

    // Actualizar el stock de los productos
    setProducts(
      products.map((p) => {
        if (p._id === product._id) {
          const oldPurchasedQuantity = purchased[product._id] || 0;
          // Calcular el nuevo stock correctamente
          const newStockQuantity =
            p.quantity + oldPurchasedQuantity - newQuantity;
          return { ...p, quantity: newStockQuantity };
        }
        return p;
      })
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mainContainer">
      <div className="salesOrderContainer">
        <h1 className="salesOrder">Sales Order</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Comprar</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{formatPrice(product.price)} Gs</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>
                  <input
                    type="number"
                    className="inputOfSalesOrder"
                    value={purchased[product._id] || ""}
                    onChange={(e) =>
                      subtractPurchasedProduct(
                        product,
                        parseInt(e.target.value)
                      )
                    }
                    disabled={product.quantity === 0}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.some(
                      (p) => p._id === product._id
                    )}
                    onChange={() => handleCheckboxChange(product)}
                  />
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
            disabled={currentPage === 1}
          >
            <img src={Previous} className="pages" alt="Previous" />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src={Next} className="pages" alt="Next" />
          </button>
        </div>
        <button className="btnBilling" onClick={generatePDF}>
          Generate Billing
        </button>
      </div>
      <div className="rightPanel">
        <AvatarSection />
        <QuickActions />
      </div>
    </div>
  );
};
