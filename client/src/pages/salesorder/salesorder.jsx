
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./salesorder.css";

export const SalesOrder = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
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
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    const handleCheckboxChange = (product) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (prevSelectedProducts.includes(product)) {
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
        const tableColumn = ["Name", "Price", "Description"];
        
        const tableRows = [];

        let total = 0;

        selectedProducts.forEach((product) => {
            const productData = [
                product.name,
                product.price,
                product.description,
            ];
            tableRows.push(productData);
            total += product.price;
        });

        doc.text("Grupo 5 ",50,5);
        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text(`Total: Gs ${total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`, 14, doc.autoTable.previous.finalY + 10);

        doc.save("grupo 5.pdf");
        setSelectedProducts([]);
    };

    return (
        <div>
            <h1>Sales Order</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{formatPrice(product.price)} Gs</td>
                            <td>{product.description}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product)}
                                    onChange={() => handleCheckboxChange(product)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btnBilling" onClick={generatePDF}>Generate Billing</button>
        </div>
    );
};


