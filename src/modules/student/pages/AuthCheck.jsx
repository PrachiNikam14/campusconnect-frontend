import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/studentService";

export default function AuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        await getProfile();
        navigate("/student/profile"); // ✅ profile exists
      } catch (err) {
        console.log(err);
        navigate("/student/create-profile"); // ❌ profile not created
      }
    };

    checkProfile();
  }, []);

  return <p>Checking...</p>;
}