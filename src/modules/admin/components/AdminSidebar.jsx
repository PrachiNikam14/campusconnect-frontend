// import { Link, useLocation } from "react-router-dom";
// import { X } from "lucide-react";
// import { useState } from "react";
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaUserGraduate,
//   FaStore,
//   FaUniversity,
//   FaCalendarAlt,
//   FaSignOutAlt,
//   FaBars,
// } from "react-icons/fa";

// const AdminSidebar = ({ closeSidebar }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
//     { name: "Users", icon: <FaUsers />, path: "/admin/users" },
//     { name: "Students", icon: <FaUserGraduate />, path: "/admin/students" },
//     { name: "Vendors", icon: <FaStore />, path: "/admin/vendors" },
//     { name: "Colleges", icon: <FaUniversity />, path: "/admin/colleges" },
//     { name: "Events", icon: <FaCalendarAlt />, path: "/admin/events" },
//   ];

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${
//         isOpen ? "w-64" : "w-16"
//       } bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 transition-all duration-300`}
//     >
//       {/* Top Section */}
//       <div className="flex items-center justify-between mb-8 mt-4">
//         {isOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}

//         <div className="flex items-center gap-2">
//           {/* Mobile Close */}
//           <button
//             className="md:hidden"
//             onClick={closeSidebar}
//           >
//             <X size={20} />
//           </button>

//           {/* Toggle */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded hover:bg-gray-700"
//           >
//             <FaBars />
//           </button>
//         </div>
//       </div>

//       {/* Menu */}
//       <ul className="flex-1 space-y-4">
//         {menuItems.map((item, index) => {
//           const isActive = location.pathname === item.path;

//           return (
//             <li key={index}>
//               <Link
//                 to={item.path}
//                 onClick={closeSidebar}
//                 className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
//                   isActive
//                     ? "bg-blue-600 shadow-lg"
//                     : "hover:bg-gray-700"
//                 }`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 {isOpen && <span className="font-medium">{item.name}</span>}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>

//       {/* Logout */}
//       <button className="flex items-center gap-4 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition mt-4">
//         <FaSignOutAlt />
//         {isOpen && <span>Logout</span>}
//       </button>
//     </div>
//   );
// };

// export default AdminSidebar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserGraduate,
  FaStore,
  FaUniversity,
  FaCalendarAlt,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { logoutUser } from "../../public/pages/auth";

const AdminSidebar = ({ closeSidebar }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Students", icon: <FaUserGraduate />, path: "/admin/students" },
    { name: "Vendors", icon: <FaStore />, path: "/admin/vendors" },
    { name: "Colleges", icon: <FaUniversity />, path: "/admin/colleges" },
    { name: "Events", icon: <FaCalendarAlt />, path: "/admin/events" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "w-64" : "w-16"}`}>
      
      {/* Top Section */}
      <div className="flex items-center justify-between mb-8 mt-4">
        {isOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}

        <div className="flex items-center gap-2">
          {/* Mobile Close */}
          <button className="md:hidden" onClick={closeSidebar}>
            <X size={20} />
          </button>

          {/* Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sidebar-toggle"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Menu */}
      <ul className="flex-1 space-y-3">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={index}>
              <Link
                to={item.path}
                onClick={closeSidebar}
                className={`sidebar-item ${
                  isActive ? "sidebar-item-active" : ""
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <button 
        onClick={() => logoutUser(navigate)}
        className="sidebar-item mt-4 bg-white/20 hover:bg-white/30">
        <FaSignOutAlt />
        {isOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default AdminSidebar;