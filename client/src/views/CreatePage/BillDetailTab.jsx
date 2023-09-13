import { useContext } from "react";
import { AlertManagerContext } from "../../components/AlertManager";
import { OrderContext } from "../../contexts/orderContext";

export const BillDetailTab = () => { 
  const { setAlert } = useContext(AlertManagerContext);
  const { orderConstructor, setOrderConstructor } = useContext(OrderContext);
  const { orderPageInfo, setOrderPageInfo } = useContext(OrderContext);

  return (
    <div>Bill Detail Tab</div>
  );
};