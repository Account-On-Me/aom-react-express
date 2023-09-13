import { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderConstructor, setOrderConstructor] = useState({
    type: "DEFAULT",
    candidateIds: [],
    candidates: [],
    items: [],
    payerId: "",
    payer: null,
  });
  const [orderPageInfo, setOrderPageInfo] = useState({
    people: [],

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