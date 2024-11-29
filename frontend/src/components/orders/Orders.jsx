import React, { useEffect, useState } from "react";
import { instance } from "../../api/axiosInstance";
import { toast } from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await instance.get("/order");
        setOrders(response.data.orders);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="bg-white mt-5 container mx-auto p-5">
      <h1 className="text-3xl my-5">Your Orders</h1>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th></th>
            <th>Order ID</th>
            <th>Amount Paid</th>
            <th>Payment Status</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 ? (
            orders.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item?._id}</td>
                <td>{item?.totalAmount} Rs</td>
                <td>Success</td>
                <td>{item?.orderStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-xl" colSpan={5}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
