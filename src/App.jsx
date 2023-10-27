import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reAuthenticate } from "./features/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import Routing from "./Routes/Routing";
import OverlayLoaderComponent from "./components/OverlayLoaderComponent";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appLoading, setAppLoading] = useState(true);
  const { isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(reAuthenticate(token))
        .then(() => {
          navigate("/dashboard");
          setAppLoading(false);
        })
        .catch((error) => {
          navigate("/login");
          setAppLoading(false);
        });
    } else {
      navigate("/login");
      setAppLoading(false);
    }
  }, []);
  if (appLoading) {
    return <OverlayLoaderComponent />;
  }

  return <Routing />;
}

export default App;
