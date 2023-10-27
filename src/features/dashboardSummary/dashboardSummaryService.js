import client from "../../client";

//this should be for admin only
const getDashboardSummary = async () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("Not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await client.get("dashboard-summary", config);

  return response.data;
};

const dashboardService = { getDashboardSummary };

export default dashboardService;
