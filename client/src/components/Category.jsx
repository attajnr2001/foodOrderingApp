import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, Skeleton } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import FoodCard from "./FoodCard";
import { Link } from "react-router-dom";
import { db } from "../helpers/firebase"; // make sure the path to your firebase config is correct
import { collection, query, limit, getDocs, where } from "firebase/firestore";

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Category = ({ type, link, category }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const q = query(
          collection(db, "food"),
          where("category", "array-contains", category),
          limit(120) // Fetch more than 4 to allow randomness
        );
        const querySnapshot = await getDocs(q);
        let foodList = [];
        querySnapshot.forEach((doc) => {
          foodList.push({ id: doc.id, ...doc.data() });
        });

        // Shuffle the food list
        foodList = shuffleArray(foodList);

        // Select the first 4 foods
        setFoods(foodList.slice(0, 4));
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [category]);

  return (
    <Box sx={{ textAlign: "left", my: 3 }}>
      <div
        className="head"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {type}
        </Typography>
        <Link to={link}>
          <IconButton>
            <ArrowForwardIos />
          </IconButton>
        </Link>
      </div>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2}>
          {loading
            ? [1, 2, 3, 4].map((index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Grid>
              ))
            : foods.map((food) => (
                <FoodCard
                  key={food.id}
                  id={food.id}
                  imageSrc={food.image}
                  title={food.name}
                  rating={food.ratings}
                  price={food.price}
                  description={food.description}
                />
              ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Category;
