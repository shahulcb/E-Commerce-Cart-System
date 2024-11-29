import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { instance } from "../api/axiosInstance";
import { AuthContext } from "./authContext";

export const CartContext = createContext();

export const CartProvivder = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    setIsCartUpdated(false);
    if (authenticated) {
      const getCartItems = async () => {
        try {
          const response = await instance.get("/cart");
          setCartItems(response.data.cartItems);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      getCartItems();
    }
  }, [isCartUpdated]);

  const addToCart = async (product) => {
    const postData = {
      product: product._id,
      quantity: 1,
    };
    try {
      const response = await instance.post("/cart", postData);
      toast.success(response.data.message);
      setIsCartUpdated(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await instance.delete(`/cart-delete/${id}`);
      toast.success(response.data.message);
      setIsCartUpdated(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateQuantity = async (id, quantityType) => {
    try {
      const response = await instance.put("/cart", {
        cartId: id,
        quantityType,
      });
      toast.success(response.data.message);
      setIsCartUpdated(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        updateQuantity,
        clearCart,
        setIsCartUpdated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
