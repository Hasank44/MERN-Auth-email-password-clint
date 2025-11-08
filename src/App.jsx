import { Navigate, Outlet } from "react-router"
import Navbar from "./components/shared/Navbar"
import Footer from "./components/shared/Footer"
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useEffect } from "react";
// import ProtectedRoute from "./components/shared/ProtectedRoute"

function App() {
  const accessToken = localStorage.getItem('accessToken');
  const disPatch = useDispatch();
  const missingStorage = () => {
    if (!accessToken || "") {
      disPatch(setUser(null));
      localStorage.clear();
      return <Navigate to="/user/login" replace />
    };
  };

  useEffect(() => {
    missingStorage();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
