
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./salesorder.css";

export const SalesOrder = () => {
    
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [purchased, setPurchased] = useState({});

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
        const tableColumn = ["Name", "Price", "Description", "Quantity", "Total Price"];
        
        const tableRows = [];

        let total = 0;

        // Contiene una lista de productos seleccionados por el usuario
        selectedProducts.forEach((product) => {
            const quantity = purchased[product._id] || 0; // Cantidad de productos comprados
            const totalPrice = product.price * quantity; // Precio total según la cantidad comprada

            const productData = [
                product.name,
                formatPrice(product.price), // Precio unitario formateado
                product.description,
                quantity, // Cantidad comprada
                formatPrice(totalPrice) // Precio total formateado
            ];

            tableRows.push(productData);
            total += totalPrice; // Sumar al total general
        });

        doc.text("Grupo 5 ", 50, 5);
        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text(`Total: Gs ${total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`, 14, doc.autoTable.previous.finalY + 10);

        doc.save("grupo 5.pdf");
        setSelectedProducts([]);

        // Actualizar el stock en el servidor
        updateStock();
    };
    
    const updateStock = async () => {
        //selectedProducts es un estado que contiene una lista de productos seleccionados por el usuario.
        const updatedProducts = selectedProducts.map(product => ({
        //Esta línea asegura que cada objeto en updatedProducts tenga la misma ID que el producto correspondiente en selectedProducts.
            _id: product._id,
            //product.quantity representa la cantidad actual en stock del producto
            //purchased[product._id]  representa la cantidad de productos comprados por el usuario
            // si el usuario no ha comprado ese producto, la cantidad vendida es 0
            quantity: product.quantity - (purchased[product._id] || 0)
        }));

        try {
            const response = await fetch("http://localhost:8000/api/update/quantity", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProducts),
            });
            if (!response.ok) {
                throw new Error("Error updating stock");
            }
            const data = await response.json();
            // Actualizar los productos con la respuesta del servidor
            setProducts(data);
        } catch (error) {
            console.log("Failed to update stock:", error);
        }
    };

    const subtractPurchasedProduct = (product, value) => {
        // Calcular la nueva cantidad comprada, asegurándose de que sea un número entre 0 y el stock actual del producto.
        // Si value no es un número válido, se asigna 0.
        const newQuantity = value ? Math.max(0, Math.min(parseInt(value), product.quantity)) : 0;

        // Actualizar el estado 'purchased' con la nueva cantidad comprada para el producto dado.
        setPurchased({
            ...purchased,
            [product._id]: newQuantity
        });

           // Actualizar el estado 'products' con la nueva cantidad en stock para el producto dado.
        setProducts(products.map(p => {
             // Si el ID del producto actual coincide con el ID del producto dado:
            if (p._id === product._id) {
                // Obtener la cantidad previamente comprada de purchased (o 0 si no hay ninguna).
                const oldPurchasedQuantity = purchased[product._id] || 0;
                // Calcular la nueva cantidad en stock sumando la cantidad previamente comprada y restando la nueva cantidad comprada
                const newStockQuantity = p.quantity + oldPurchasedQuantity - newQuantity;
                   // Retornar el producto con la nueva cantidad en stock.
                return { ...p, quantity: newStockQuantity };
            }
             // Si el ID del producto actual no coincide, retornar el producto sin cambios.
            return p;
        }));
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
                        <th>Stock</th>
                        <th>Comprar</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{formatPrice(product.price)} Gs</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <input 
                                    type="number"
                                    value={purchased[product._id] || ""}
                                    onChange={(e) => subtractPurchasedProduct(product, parseInt(e.target.value))}
                                    disabled={product.quantity === 0}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.some(p => p._id === product._id)}
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
