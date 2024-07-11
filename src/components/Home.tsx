import ChooseUs from './product/ChooseUs';
import Popular from './product/Popular';
import Product from './product/product';
import CardSlider from './showcase/slider/showcase';
function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <CardSlider />
      <Popular />
      <ChooseUs />
      <Product />
    </div>
  );
}

export default Home;
