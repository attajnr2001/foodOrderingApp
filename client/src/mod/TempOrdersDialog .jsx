import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import DeliveryDialog from "./DeliveryDialog";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

function TempOrdersDialog({
  open,
  onClose,
  tempOrders,
  onRemoveOrder,
  onOrder,
}) {
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);
  const [orderType, setOrderType] = useState("delivery");
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [orderQuantities, setOrderQuantities] = useState(
    Array(tempOrders.length).fill(1) // Initialize quantities with 1 for each order
  );
  const [totalPrice, setTotalPrice] = useState(0);

  // Update total price whenever orderQuantities or tempOrders change
  useEffect(() => {
    let total = 0;
    tempOrders.forEach((order, index) => {
      const quantity = orderQuantities[index];
      total += order.totalPrice * quantity;
    });
    setTotalPrice(total);
  }, [orderQuantities, tempOrders]);

  const toggleExpand = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };

  const handleOrderTypeClick = (type) => {
    setOrderType(type);
  };

  const handleOrder = () => {
    if (orderType === "delivery") {
      setShowDeliveryDialog(true);
    } else {
      // Handle pickup order logic
      onOrder();
    }
  };

  const handleQuantityChange = (event, index) => {
    const { value } = event.target;
    const newQuantities = [...orderQuantities];
    newQuantities[index] = parseInt(value) || 1; // Ensure it's a number, default to 1 if NaN
    setOrderQuantities(newQuantities);
  };

  const orderTypeStyle = {
    backgroundColor: orderType === "delivery" ? "#6439ff" : "#fff",
    color: orderType === "delivery" ? "#fff" : "#6439ff",
    border: "1px solid #6439ff",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
    position: "relative",
    top: 5,
    fontSize: "small",
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>Your Cart</DialogTitle>
        <DialogContent>
          <Paper sx={{ p: 2 }}>
            <List>
              {tempOrders.map((order, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          fontWeight="bold"
                          textTransform={"capitalize"}
                        >
                          {order.foodName} - ${order.totalPrice}
                        </Typography>
                      }
                    />
                    <TextField
                      label="Quantity"
                      type="number"
                      size="small"
                      value={orderQuantities[index]}
                      onChange={(e) => handleQuantityChange(e, index)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: 1,
                      }}
                      style={{ marginLeft: "auto" }}
                    />
                    <IconButton onClick={() => toggleExpand(index)}>
                      {expandedOrderIndex === index ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                    <IconButton onClick={() => onRemoveOrder(index)}>
                      <DeleteIcon color="warning" />
                    </IconButton>
                  </ListItem>
                  <AnimatePresence>
                    {expandedOrderIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ListItem>
                          <ListItemText
                            secondary={
                              <>
                                <Typography component="span" variant="body2">
                                  Toppings:
                                </Typography>
                                <ul>
                                  {order.toppings.map((topping, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 20 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      {topping.name} - ${topping.price}
                                    </motion.li>
                                  ))}
                                </ul>
                                <Typography component="span" variant="body2">
                                  Instructions:{" "}
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2, delay: 0.1 }}
                                  >
                                    {order.instructions}
                                  </motion.span>
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {index < tempOrders.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          <div>
            <span
              style={orderTypeStyle}
              onClick={() => handleOrderTypeClick("delivery")}
            >
              Delivery
            </span>
            <span
              style={{
                ...orderTypeStyle,
                backgroundColor: orderType === "pickup" ? "#6439ff" : "#fff",
                color: orderType === "pickup" ? "#fff" : "#6439ff",
              }}
              onClick={() => handleOrderTypeClick("pickup")}
            >
              Pickup
            </span>
          </div>

          {/* Alert message */}
          {orderType === "delivery" && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Delivery fee not included
            </Alert>
          )}

          {/* Total Price */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<ShoppingCart />}
            sx={{
              mt: 2,
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
            }}
            variant="contained"
            onClick={handleOrder}
          >
            ORDER
          </Button>
        </DialogActions>
      </Dialog>
      <DeliveryDialog
        open={showDeliveryDialog}
        onClose={() => setShowDeliveryDialog(false)}
      />
    </>
  );
}

export default TempOrdersDialog;
