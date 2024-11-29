import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeItem, updateQuantity } = useContext(CartContext);

  const handleDeleteItem = (id) => {
    const isConfirm = window.confirm("Are you sure to remove from cart");
    if (isConfirm) {
      removeItem(id);
    }
  };

  const handleUpdateQuantity = (item, quantityType) => {
    updateQuantity(item._id, quantityType);
  };

  return (
    <div className="container mx-auto flex flex-col flex-wrap gap-5 mt-5">
      {cartItems.length <= 0 ? (
        <p className="text-lg text-center">Cart Is Empty</p>
      ) : (
        cartItems?.map((item) => (
          <div className="h-32 w-full bg-white rounded shadow-md shadow-stone-200 flex gap-5 items-center justify-between px-4 py-2">
            <div className="flex items-center gap-5">
              <img
                src={
                  process.env.REACT_APP_STATIC_FILES_URL + item?.product?.image
                }
                alt="Product image"
                className="h-full w-32 rounded"
              />
              <div className="w-52">
                <p className="text-lg">{item?.product?.name}</p>
                <p className="text-lg text-lime-400">
                  {item?.product?.price} Rs
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <button
                className="bg-stone-200 w-8 h-8 rounded"
                onClick={() => handleUpdateQuantity(item, "dec")}
              >
                -
              </button>
              <span>{item?.quantity}</span>
              <button
                className="bg-stone-200 w-8 h-8 rounded"
                onClick={() => handleUpdateQuantity(item, "inc")}
              >
                +
              </button>
            </div>
            <button
              className="flex items-center justify-center bg-red-400 rounded-md text-white w-10 h-10"
              onClick={() => handleDeleteItem(item?.product?._id)}
            >
              <i className="fa fa-trash text-2xl"></i>
            </button>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <>
          <div className="mt-5 text-lg text-center">
            <h3 className="text-2xl mb-3">Order Summary</h3>
            <p className="">
              Units:{" "}
              <span className="font-bold">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
                (Units)
              </span>
            </p>
            <p>
              Est. total:
              <span className="font-bold">
                {cartItems.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )}{" "}
                RS
              </span>
            </p>
          </div>
          <Link to="/shipping" className="w-full">
            <button
              to="/shipping"
              className="bg-lime-400 h-12 w-full rounded text-lg text-white"
            >
              Check out
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
