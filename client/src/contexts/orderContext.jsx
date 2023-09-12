import { createContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderConstructor, setOrderConstructor] = useState({});
  const [orderPageInfo, setOrderPageInfo] = useState({
    stepperConfig: {
    }
  });

  return (
    <OrderContext.Provider value={{
      orderConstructor,
      setOrderConstructor,
      orderPageInfo,
      setOrderPageInfo 
    }}>
      {children}
    </OrderContext.Provider>
  );
};