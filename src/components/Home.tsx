import ChooseUs from "./product/ChooseUs";
import Popular from "./product/Popular";
import CardSlider from "./showcase/slider/showcase";

function Home() {
  return (
    <div className="w-full h-full">
      <CardSlider />
      <Popular />
      <ChooseUs />
    </div>
  );
}

export default Home;
