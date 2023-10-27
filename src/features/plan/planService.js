import client from "../../client";

const getPlans = async () => {
  const response = await client.get("plan");
  return response.data.plans;
};

//restricted to admin only
const createPlan = async (data) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token found, hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await client.post("plan", data, config);
  return response.data.message;
};

//subscribe to plan=> for users with a token present in localStorage
const subscribeToPlan = async (data) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token found and hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.patch("plan/subscribe", data, config);
  return response.data.message;
};

const updatePlan = async (data) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token found and hence not authorized");
  }
  //formData which contains fields with respective changes to be made
  console.log(data);
  const { id } = data;
  const { planObject } = data;
  console.log(planObject);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.patch(`plan/${id}`, planObject, config);
  return response.data.message;
};
const getPlan = async (id) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    console.log("No user token found and hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.get(`plan/${id}`, config);
  return response.data.plan;
};
const deletePlan = async (id) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    console.log("No user token found and hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.delete(`plan/${id}`, config);
  console.log(response);
  return response.data.message;
};
const planService = {
  getPlans,
  createPlan,
  subscribeToPlan,
  updatePlan,
  getPlan,
  deletePlan,
};

export default planService;
