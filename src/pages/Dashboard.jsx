import AdminDashboardHome from "../components/Admin/AdminDashboardHome";
import ClientDashboardHome from "../components/Client/ClientDashboardHome";

const userRole = "client";
function Dashboard() {
  return userRole === "admin" ? (
    <AdminDashboardHome />
  ) : (
    <ClientDashboardHome />
  );
}

export default Dashboard;
