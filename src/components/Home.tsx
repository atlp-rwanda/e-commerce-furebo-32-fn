import ChooseUs from "./product/ChooseUs";
import Popular from "./product/Popular";
import Product from "./product/product";
import CardSlider from "./showcase/slider/showcase";

import Header from './Header'; 

const Home = () => {
  return (
    <div >
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center">Home GeekLords</h1>
      
      </div>
      
    <div className="w-full h-full flex flex-col justify-center">
      <CardSlider />
      <Popular />
      <ChooseUs />
      <Product />
    </div>
    </div>
  );
};

export default Home;
