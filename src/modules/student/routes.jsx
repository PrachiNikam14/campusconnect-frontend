import { Route } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";
import StudentProfilePage from "./pages/StudentProfilePage";
import StudentEventPage from "./pages/StudentEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import StudentRegisteredEventPage from "./pages/StudentRegisteredEventPage";
import AuthCheck from "./pages/AuthCheck";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/UpdProfile";

const StudentRoutes = (
  <Route path="/student" element={<StudentLayout />}>

    {/* Default Dashboard */}
    <Route index element={<AuthCheck />} />

    {/* Profile */}
    <Route path="profile" element={<Profile />} />
    <Route path="create-profile" element={<CreateProfile />} />

    {/* Events */}
    <Route path="events">
      {/* /student/events */}
      <Route index element={<StudentEventPage />} />
      {/* /student/events/:id */}
      <Route path=":id" element={<EventDetailsPage />} />
    </Route>

    {/* Registered Events */}
    <Route path="registeredevents" element={<StudentRegisteredEventPage />} />

  </Route>
);

export default StudentRoutes;