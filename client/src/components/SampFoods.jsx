import React, { useEffect, useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import Category from "./Category";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../helpers/firebase"; // Adjust the import based on your firebase configuration file

const SampFoods = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoriesCollection = collection(db, "category");

    const unsubscribe = onSnapshot(categoriesCollection, (snapshot) => {
      const categoryList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <TextField
        sx={{ p: 0, width: "100%", fontSize: "1em", fontWeight: "bold" }}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {categories.map((category) => (
        <Category
          key={category.id}
          type={category.type}
          link={category.id}
          category={category.name}
        />
      ))}
    </Box>
  );
};

export default SampFoods;
