import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../helpers/firebase";

const DeliveryDialog = ({ open, onClose, onSelect }) => {
  const [deliveryGuys, setDeliveryGuys] = useState([]);
  const [selectedGuy, setSelectedGuy] = useState(null);

  useEffect(() => {
    const fetchDeliveryGuys = async () => {
      try {
        const deliveryGuysCollection = collection(db, "deliveryGuys");
        const querySnapshot = await getDocs(deliveryGuysCollection);
        const deliveryGuysData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDeliveryGuys(deliveryGuysData);
      } catch (error) {
        console.error("Error fetching delivery guys:", error);
      }
    };

    fetchDeliveryGuys();
  }, []);

  const handleSelect = (guy) => {
    setSelectedGuy(guy);
  };

  const handleConfirm = () => {
    if (selectedGuy) {
      onSelect(selectedGuy);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Choose Delivery Guy</DialogTitle>
      <DialogContent>
        <List>
          {deliveryGuys.map((guy) => (
            <ListItem
              key={guy.id}
              button
              onClick={() => handleSelect(guy)}
              selected={selectedGuy && selectedGuy.id === guy.id}
            >
              <ListItemText primary={`${guy.name} - ${guy.contact}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          disabled={!selectedGuy}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeliveryDialog;
