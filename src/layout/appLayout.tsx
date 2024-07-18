import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AppLayout() {
  return (
    <div className="flex justify-center flex-col items-center w-full">
          <Header />
          <main className="flex justify-center w-[84.722%] max-sm:w-[95%]">
            <Outlet />
          </main>
          <Footer />
    </div>
  );
}

export default AppLayout;
