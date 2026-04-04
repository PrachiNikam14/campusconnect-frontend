import { Outlet } from "react-router-dom";
import { useState } from "react";
import StudentSidebar from "../modules/student/components/StudentSidebar";
import Navbar from "../modules/public/components/Navbar";
import Footer from "../modules/public/components/Footer";

export default function StudentLayout() {
  const [active, setActive] = useState("Profile");

  return (
    <div className="min-h-screen flex flex-col">

      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🧱 Main Section (Sidebar + Content) */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <StudentSidebar active={active} setActive={setActive} />

        {/* Content */}
        <div className="flex-1 p-6 bg-gray-100 mt-16">
          <Outlet />
        </div>

      </div>

      {/* 🔻 Footer */}
      <Footer />

    </div>
  );
}