import React, { useContext } from "react";
import { OrderContext } from "../../context/orderContext";
import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/axiosInstance";
import toast from "react-hot-toast";

const ConfirmOrder = () => {
  const { shippingDetails } = useContext(OrderContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate("");

  const handlePayment = async () => {
    const postData = {
      shippingInfo: { ...shippingDetails },
      orderItems: cartItems,
      taxAmount: 0,
      shippingAmount: 0,
      totalAmount: cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    };
    try {
      const response = await instance.post("/order", postData);
      navigate("/payment-success");
      clearCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white flex justify-between items-center gap-5 mt-6 p-6 w-[700px] mx-auto rounded">
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl my-5">Shipping Info</h2>
          <p className="text-lg">
            Name: <span className="font-bold">{user?.name}</span>
          </p>
          <p className="text-lg">
            Phone: <span className="font-bold">{shippingDetails?.phone}</span>
          </p>
          <p className="text-lg">
            Address:{" "}
            <span className="font-bold">{shippingDetails?.address}</span>
          </p>
        </div>
        <div className="mt-5">
          <h2 className="text-2xl my-5">Your Cart Items:</h2>
          <div className="flex flex-col gap-4 w-full">
            {cartItems?.map((item) => (
              <>
                <div
                  className="flex items-center justify-between gap-4"
                  key={item?._id}
                >
                  <img
                    src={
                      process.env.REACT_APP_STATIC_FILES_URL +
                      item?.product?.image
                    }
                    alt=""
                    className="h-20 w-24"
                  />
                  <p className="text-lg">{item?.product?.name}</p>
                  <p className="text-lg">
                    {item?.quantity} * {item?.product?.price} =
                    {item?.product?.price * item?.quantity}
                  </p>
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl my-5">Order Summary</h2>
        <p className="text-lg">
          Subtotal:{" "}
          <span className="font-bold">
            {cartItems.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            )}{" "}
            RS
          </span>
        </p>
        <p className="text-lg">
          Shipping: <span className="font-bold">0 Rs</span>
        </p>
        <p className="text-lg">
          Tax: <span className="font-bold">0 Rs</span>
        </p>
        <p className="text-sm w-40">
          *The mock payment will take you to the success page.
        </p>
        <button
          className="bg-lime-400 text-white h-10 p-1 rounded"
          onClick={handlePayment}
        >
          Procced to Payment
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
