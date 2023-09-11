import { Fragment } from "react";
import { Alert, Snackbar } from "@mui/material";

export const AlertManagerProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success"
  });

  return (
    <AlertManagerContext.Provider value={{
      alert,
      setAlert
    }}>
      <Fragment>
        
        {children}
      </Fragment>
    </AlertManagerContext.Provider>
  );
}