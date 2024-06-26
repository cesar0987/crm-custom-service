import React from "react";
import createOrder from "../../Assets/createorder.png";
import addSupplier from "../../Assets/addsupplier.png";
import addProduct from "../../Assets/addproduct.png";
import exportProduct from "../../Assets/export.png";
import "./QuickActions.css";

export const QuickActions = () => {
  return (
    <div className="QuickActions">
      <div className="quickActionsContainer">
        <div className="quickAction">
          <img src={createOrder} alt="Create Order Icon" />
          <span>Create Order</span>
        </div>
        <div className="quickAction">
          <img src={addSupplier} alt="Add Supplier Icon" />
          <span>Add Supplier</span>
        </div>
        <div className="quickAction">
          <img src={addProduct} alt="Add Product Icon" />
          <span>Add Product</span>
        </div>
        <div className="quickAction">
          <img src={exportProduct} alt="Export Icon" />
          <span>Export</span>
        </div>
      </div>
    </div>
  );
};
