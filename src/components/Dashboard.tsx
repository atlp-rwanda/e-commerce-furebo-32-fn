import React from "react";
import Sidebar from "./Sidebar";

const Dashboard: React.FC = () => {
  return (
    <div>
        <div className="flex">
      <Sidebar/>
      <h2>Welcome to the protected dashboard!</h2>
    </div>
    </div>
  );
};

export default Dashboard;
