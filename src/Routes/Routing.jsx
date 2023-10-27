// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Router,
//   Route,
//   RouterProvider,
//   useNavigate,
// } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import AdminLayout from "../layout/AdminLayout";
import ClientLayout from "../layout/ClientLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Admin/Users";
import User from "../pages/Admin/User";
import Plans from "../pages/Admin/Plans";
import CreatePlan from "../pages/Admin/CreatePlan";
import UpdatePlan from "../pages/Admin/UpdatePlan";
import Deposits from "../pages/Admin/Deposits";
import Deposit from "../pages/Client/Deposit";
import Invest from "../pages/Client/Invest";
import Transactions from "../pages/Client/Transactions";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Client/Profile";
import Withdraw from "../pages/Client/Withdraw";

function Routing() {
  // const userRole = "admin";
  const { user } = useSelector((state) => state.auth);

  return (
    // <Router>
    <Routes>
      <Route
        path="/dashboard"
        element={user?.role === "admin" ? <AdminLayout /> : <ClientLayout />}
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route path="plans" element={<Plans />} />
        <Route path="plans/create-plan" element={<CreatePlan />} />
        <Route path="plans/:id" element={<UpdatePlan />} />
        <Route path="deposits" element={<Deposits />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="buy-plan" element={<Invest />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="profile" element={<Profile />} />
        <Route path="withdrawal" element={<Withdraw />} />
      </Route>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
    // </Router>
  );
}

export default Routing;
