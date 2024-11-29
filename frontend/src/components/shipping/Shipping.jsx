import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/orderContext";
import { Navigate, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

const Shipping = () => {
  const { setShippingDetails } = useContext(OrderContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setShippingDetails({ address, city, phone, zipCode, country });
    navigate("/confirm-order");
  };
  return (
    <div className="w-[450px] mx-auto mt-6 bg-white p-5">
      <h1 className="text-2xl my-5">Shipping Info</h1>
      <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Address</label>
          <input
            type="text"
            className="h-11 border rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">City</label>
          <input
            type="text"
            className="h-11 border rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Phone No</label>
          <input
            type="number"
            className="h-11 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Zip Code</label>
          <input
            type="number"
            className="h-11 border rounded"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Country</label>
          <input
            type="text"
            className="h-11 border rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button className="bg-lime-400 h-11 rounded text-white text-lg">
          CONTINUE
        </button>
      </form>
    </div>
  );
};

export default Shipping;
