import { createContext } from "react";

const orderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderConstructor, setOrderConstructor] = useState({});
  const [orderPageInfo, setOrderPageInfo] = useState({});

  return (
    <orderContext.Provider value={{
      orderConstructor,
      setOrderConstructor,
      orderPageInfo,
      setOrderPageInfo 
    }}>
      {children}
    </orderContext.Provider>
  );
};