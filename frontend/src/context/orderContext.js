import { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [shippingDetails, setShippingDetails] = useState({});

  return (
    <OrderContext.Provider value={{ shippingDetails, setShippingDetails }}>
      {children}
    </OrderContext.Provider>
  );
};
