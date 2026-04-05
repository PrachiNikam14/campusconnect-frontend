// utils/auth.js
export const logoutUser = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login", { replace: true });
};