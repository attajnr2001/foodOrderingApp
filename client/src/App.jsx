import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./helpers/Theme";
import Welcome from "./pages/Welcome";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard/:clientID" element={<RootLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;