import { useContext, useState } from "react";
import { AlertManagerContext } from "../../components/AlertManager";
import { OrderContext } from "../../contexts/orderContext";
import { Box, Container, Divider, Grid, IconButton, List, ListItem, Paper, Skeleton, Slide, Typography } from "@mui/material";
import { AddShoppingCart, LocalOffer } from "@mui/icons-material";

const defaultNewItem = {
  name: "",
  price: 0,
  quantity: 1,
  taxed: false,
  type: "DEFAULT",
  method: "EQUAL",
  thumbnail: "",
  paychecks: [],
}

const SCALES = {
  thumbnailSize: '220px',
}

export const BillDetailTab = () => {
  const { setAlert } = useContext(AlertManagerContext);
  const { orderConstructor, setOrderConstructor } = useContext(OrderContext);
  const { orderPageInfo, setOrderPageInfo } = useContext(OrderContext);

  const handleItemUpdate = (index, item) => {
    setOrderConstructor(prev => {
      const newItems = [...prev.items];
      newItems[index] = item;
      return { ...prev, items: newItems };
    });
  };

  const handleItemDelete = (index) => {
    setOrderConstructor(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  const handleItemAdd = () => {
    setOrderConstructor(prev => {
      const newItems = [...prev.items];
      newItems.push(defaultNewItem);
      return { ...prev, items: newItems };
    });
  }

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
        <List sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "12px",
          boxSizing: "border-box",
          maxHeight: "55vh",
          overflowY: "auto",
        }}>
          {orderConstructor.items.map((item, index) => (
            <ListItem key={item._id} sx={{
              justifyContent: "center",
              backgroundColor: "white",
              width: "100%",
              borderRadius: "10px",
              boxSizing: "border-box",
              mb: '15px',
            }}>
              <OrderItemPanel
                item={item}
                updateItem={(newItem) => handleItemUpdate(index, newItem)}
                deleteItem={() => handleItemDelete(index)}
              />
            </ListItem>
          ))}
          <ListItem sx={{
            display: "flex",
            justifyContent: "center",
          }}>
            <IconButton onClick={handleItemAdd} sx={{
              borderColor: "primary.main",
              borderWidth: "1px",
              borderStyle: "solid",
            }}>
              <AddShoppingCart sx={{
                color: "primary.main",
                width: "30px",
                height: "30px",
              }} />
            </IconButton>
          </ListItem>
        </List>
      </Box>
    </Slide>
  );
};

const OrderItemPanel = ({ item, updateItem, deleteItem }) => {
  const [editing, setEditing] = useState(true);

  return (
    <Paper elevation={2} sx={{
      width: "100%",
      boxSizing: "border-box",
    }}>
      <Box sx={{
        display: "flex",
        // alignItems: "center",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}>
        {/* thumbnail */}
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt="Item"
            loading="lazy"
            sx={{
              width: SCALES.thumbnailSize,
              height: SCALES.thumbnailSize,
            }}
          />
        ) : (
          <Box sx={{width: SCALES.thumbnailSize, height: SCALES.thumbnailSize}}>
            <Skeleton variant="rectangular" width="100%" height="100%" animation={"wave"} sx={{ backgroundColor: 'primary.main', opacity: 0.7 }} />
          </Box>
        )}
        <Box sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}>
          {/* col 1: name, price, quantity, taxed */}
          {editing ? (
            <Grid container rowSpacing={1} columnSpacing={1} justifyContent="flex-start" alignItems="flex-start" sx={{
              boxSizing: "border-box",
              m: 0
            }}>
              <Grid item xs={4}>
                name
              </Grid>
              <Grid item xs={8}>
                name field
              </Grid>
              <Grid item xs={4}>
                price
              </Grid>
              <Grid item xs={8}>
                price field
              </Grid>
              <Grid item xs={4}>
                quantity
              </Grid>
              <Grid item xs={8}>
                quantity field
              </Grid>
              <Grid item xs={4}>
                taxed
              </Grid>
              <Grid item xs={8}>
                taxed toggle
              </Grid>
            </Grid>
          ) : (
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item xs={12}>
                222
              </Grid>
            </Grid>
          )}
          <Divider orientation="vertical" flexItem />
          {/* col 2: type, method, paychecks */}
          <Grid container rowSpacing={1} columnSpacing={1} justifyContent="flex-start" alignItems="flex-start" sx={{
            boxSizing: "border-box",
            m: 0
          }}>
            <Grid item xs={4}>
              type
            </Grid>
            <Grid item xs={8}>
              type dropdown
            </Grid>
            <Grid item xs={4}>
              method
            </Grid>
            <Grid item xs={8}>
              method dropdown
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ p: '30px' }}>
                method extended
              </Typography>
            </Grid>
            {/* <Grid container direction="column" sx={{ height: "100%" }}>
              <Grid item sx={{ height: "100%" }}>
                method extended
              </Grid>
            </Grid> */}
          </Grid>
          <Divider orientation="vertical" flexItem />
          {/* col 3: confirm and delete buttons */}
          <Grid container direction="column" rowSpacing={1} columnSpacing={1} justifyContent="stretch" alignItems="stretch" sx={{
            boxSizing: "border-box",
            m: 0,
            width: "50%",
          }}>
            <Grid item xs={6}>
              444
            </Grid>
            <Grid item xs={6}>
              444
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  )
};