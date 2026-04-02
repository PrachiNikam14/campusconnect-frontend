import { Outlet } from "react-router-dom";
import Sidebar from "../modules/college/components/Sidebar";
import Navbar from "../modules/college/components/Navbar";

function CollegeLayout() {
  return (
    <div className="min-h-screen flex bg-soft">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 mt-16">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default CollegeLayout;