import { Box, FormControl, MenuItem, Select, Slide, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { OrderContext } from "../../contexts/orderContext";


export const BillTypeTab = () => {
  const { orderConstructor, setOrderConstructor } = useContext(OrderContext);
  const { orderPageInfo, setOrderPageInfo } = useContext(OrderContext);

  return (
    <Slide in={true} direction="up">
      <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}>
        <Typography variant="h3" sx={{
          mb: '50px',
        }}>
          What is this bill about?
        </Typography>
        <FormControl variant="standard" sx={{
          width: "30%",
        }}>
          <Select
            value={orderConstructor.type}
            label="Bill Type"
            onChange={(e) => setOrderConstructor({ ...orderConstructor, type: e.target.value })}
          >
            <MenuItem value="DEFAULT">General</MenuItem>
            <MenuItem value="WALMART">Walmart</MenuItem>
            <MenuItem value="INTERNET">XFinity</MenuItem>
            <MenuItem value="ENERGY">Duke Energy</MenuItem>
            <MenuItem value="TAKEOUT">Take Out</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Slide>
  )
}