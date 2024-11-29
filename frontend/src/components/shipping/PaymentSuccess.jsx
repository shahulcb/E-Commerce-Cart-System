import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="h-52 w-72 mx-auto mt-6 text-center flex flex-col gap-3">
      <i className="fa fa-check text-3xl text-lime-400"></i>
      <p className="text-3xl text-lime-400">Payment Success</p>
      <Link to="/orders" className="underline text-blue-300">
        Go to orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;
