import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../helpers/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Orders = () => {
  const { clientID } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersCollection = collection(db, "orders");
    const ordersQuery = query(
      ordersCollection,
      where("clientId", "==", clientID)
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, [clientID]);

  return (
    <Box sx={{ position: "relative", top: "3em" }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      {orders.map((order) => (
        <div key={order.id}>
          <Typography variant="body1">Order ID: {order.id}</Typography>
          {/* Render other order details as needed */}
        </div>
      ))}
    </Box>
  );
};

export default Orders;
