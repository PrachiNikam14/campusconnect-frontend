import { BrowserRouter, Routes } from "react-router-dom";
import PublicRoutes from "../modules/public/routes";
import CollegeRoutes from "../modules/college/routes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes}
        {CollegeRoutes}   
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;