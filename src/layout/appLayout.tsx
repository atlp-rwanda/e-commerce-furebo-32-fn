import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex justify-center flex-col items-center">
     
      <main className="flex justify-center w-[84.722%] max-sm:w-[95%]">
          <Outlet />
      </main>
    </div>
  );
}
export default AppLayout;