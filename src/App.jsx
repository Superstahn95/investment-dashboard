import {
  createBrowserRouter,
  createRoutesFromElements,
  Router,
  Route,
  RouterProvider,
} from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import ClientLayout from "./layout/ClientLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Admin/Users";
import User from "./pages/Admin/User";
import Plans from "./pages/Admin/Plans";
import CreatePlan from "./pages/Admin/CreatePlan";
import UpdatePlan from "./pages/Admin/UpdatePlan";
import Deposits from "./pages/Admin/Deposits";
import Deposit from "./pages/Client/Deposit";
import Invest from "./pages/Client/Invest";

const userRole = "client";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={userRole === "admin" ? <AdminLayout /> : <ClientLayout />}
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
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
