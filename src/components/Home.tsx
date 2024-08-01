import ChooseUs from './product/ChooseUs';
import Popular from './product/Popular';
import Product from './product/product';
import CardSlider from './showcase/slider/showcase';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function Home() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      toast.success('Logged in successfully');
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <ToastContainer />
      <CardSlider />
      <Popular />
      <ChooseUs />
      <Product />
    </div>
  );
}

export default Home;
