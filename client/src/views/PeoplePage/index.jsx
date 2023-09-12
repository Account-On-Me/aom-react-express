import { Box } from "@mui/material"
import { useLocation } from "react-router-dom"


export const PeoplePage = () => { 
  const { state } = useLocation();
  const { text } = state;

  return (
    <Box sx={{
      border: "1px solid red",
    }}>
      {text}
    </Box>
  )
}