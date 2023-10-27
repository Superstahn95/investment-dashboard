import AdminDashboardHome from "../components/Admin/AdminDashboardHome";
import ClientDashboardHome from "../components/Client/ClientDashboardHome";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  return user?.role === "admin" ? (
    <AdminDashboardHome />
  ) : (
    <ClientDashboardHome />
  );
}

export default Dashboard;
