import { Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";

function AppLayout() {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/login');
    };
  return (
    <div className="flex justify-center flex-col items-center">
      <nav className="h-[80px] bg-slate-500 w-full">
        navBar Home GeekLords
        <Button
          className="bg-red-500 text-black hover:bg-red-700"
          variant="contained"
          onClick={handleClick}
        >
          Login
        </Button>
      </nav>
      <main className="flex justify-center w-[84.722%] max-sm:w-[95%]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default AppLayout;