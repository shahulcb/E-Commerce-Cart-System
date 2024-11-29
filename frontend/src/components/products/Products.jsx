import React, { useContext, useEffect, useState } from "react";
import { instance } from "../../api/axiosInstance";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/authContext";
import AddProduct from "../admin/AddProduct";
import EditProduct from "../admin/EditProduct";
import { CartContext } from "../../context/cartContext";

const Products = ({ addProduct }) => {
  const { user } = useContext(AuthContext);
  const { cartItems, addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [isProductDeleted, setIsProductDeleted] = useState(false);
  const [isProductEdited, setIsProductEdited] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get("/products");
        setProducts(response.data.products);
        setIsProductEdited(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchProducts();
  }, [addProduct, isProductDeleted, isProductEdited]);

  const handleDeleteProduct = async (id) => {
    try {
      const isConfirmed = window.confirm("Are you sure to delete this product");
      if (isConfirmed) {
        const response = await instance.delete(`/admin/products/${id}`);
        toast.success("Product deleted");
        setIsProductDeleted(!isProductDeleted);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-wrap gap-5">
      {products.map((product) => (
        <>
          {editMode && editProductId === product._id ? (
            <EditProduct
              product={product}
              setEditMode={setEditMode}
              setIsProductEdited={setIsProductEdited}
              setEditProductId={setEditProductId}
              key={product._id}
            />
          ) : (
            <div
              className="w-72 min-h-72 bg-white p-3 flex flex-col text-lg text-center gap-3 rounded cursor-pointer shadow-md shadow-stone-200"
              key={product._id}
            >
              <img
                src={process.env.REACT_APP_STATIC_FILES_URL + product.image}
                className="w-full h-36 rounded"
                alt="product image"
              />
              <p>{product.name}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Suscipit perspiciatis inventore eligendi atque blanditiis
                cupiditate?
              </p>
              <p className="text-lime-400">{product.price} Rs</p>
              {user?.role === "user" && (
                <div className="flex flex-col gap-3 items-center justify-evenly">
                  <button
                    className="h-10 w-full bg-lime-400 rounded text-white disabled:bg-lime-300"
                    disabled={Number(product.stock) <= 0}
                    onClick={() => addToCart(product)}
                  >
                    {product.stock <= 0 ? (
                      "Out of Stock"
                    ) : (
                      <i className="fa fa-cart-plus"></i>
                    )}
                  </button>
                </div>
              )}
              {user?.role === "admin" && (
                <div className="flex gap-3 items-center justify-center">
                  <button
                    className="bg-red-400 text-white w-10 h-10 rounded"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                  <button
                    className="bg-blue-400 text-white w-10 h-10 rounded"
                    onClick={() => {
                      setEditMode(true);
                      setEditProductId(product._id);
                    }}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Products;
