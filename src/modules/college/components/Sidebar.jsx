import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, User, List } from "lucide-react";

function Sidebar() {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
    ${isActive
      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
      : "text-gray-600 hover:bg-purple-50 hover:text-indigo-600"}`;

  return (
    <aside className="w-64 bg-white border-r p-5 shadow-sm">

      {/* Title */}
      <h2 className="text-xl font-bold text-grad-primary mb-6">
        College Panel
      </h2>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent mb-4"></div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">

        {/* Dashboard */}
        <NavLink to="/college/dashboard" className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* Create Event */}
        <NavLink to="/college/create-event" className={linkClass}>
          <PlusCircle size={18} />
          Create Event
        </NavLink>


        {/*MyEvents History */}
        <NavLink to="/college/events" className={linkClass}>
        <List size={18} />
        My Events
        </NavLink>


        {/* Profile */}
        <NavLink to="/college/profile" className={linkClass}>
          <User size={18} />
          Profile
        </NavLink>


      </nav>

    </aside>
  );
}

export default Sidebar;