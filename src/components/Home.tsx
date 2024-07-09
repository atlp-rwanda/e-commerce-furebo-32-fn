import ChooseUs from "./product/ChooseUs";
import Popular from "./product/Popular";
import Product from "./product/product";
import CardSlider from "./showcase/slider/showcase";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="bg-blue-500 p-4">
      Home GeekLords
      <Button
        className="bg-red-500 text-black hover:bg-red-700"
        variant="contained"
        onClick={handleClick}
      >
        Login
      </Button>
      <div className="w-full h-full flex flex-col justify-center">
        <CardSlider />
        <Popular />
        <ChooseUs />
        <Product />
      </div>
    </div>
  );
}

export default Home;
