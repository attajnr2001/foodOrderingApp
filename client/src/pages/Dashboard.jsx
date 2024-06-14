import React from "react";
import Slideshow from "../components/SlideShow";
import Category from "../components/Category";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: 7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    width: "5px",
  },
}));

const Dashboard = () => {
  return (
    <>
      <Slideshow />
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
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Category
          type={"Foreign Foods"}
          link={"food link"}
          category={"foreign"}
        />

        <Category type={"Local Foods"} link={"food link"} category={"local"} />

        <Category
          type={"BreakFast"}
          link={"food link"}
          category={"breakfast"}
        />

        <Category type={"Lunch"} link={"food link"} category={"lunch"} />

        <Category type={"Supper"} link={"food link"} category={"supper"} />

        <Category type={"Snacks"} link={"food link"} category={"snacks"} />
      </Box>
    </>
  );
};

export default Dashboard;
