import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";  // Assuming you have Login component
import Contact from "./components/Contact";  // Assuming you have Contact component
import AppLayout from "./layout/appLayout";
import { ThemeProvider } from "@mui/material";
import { MuiTheme } from "./config/muiTheme";

export const App = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
