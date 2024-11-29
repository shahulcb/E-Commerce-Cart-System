import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Products from "../products/Products";
import AddProduct from "../admin/AddProduct";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [addProduct, setAddProduct] = useState(false);
  return (
    <div className="container mx-auto mt-5">
      <Products addProduct={addProduct} />
      {user?.role === "admin" && !addProduct && (
        <div
          className="w-full h-20 mt-5 bg-lime-400 flex items-center justify-center text-xl rounded text-white cursor-pointer"
          onClick={() => setAddProduct(true)}
        >
          Add Product
        </div>
      )}
      {addProduct && <AddProduct setAddProduct={setAddProduct} />}
    </div>
  );
};

export default Dashboard;
