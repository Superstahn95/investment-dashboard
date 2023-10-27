import client from "../../client";

//individual
const makeDeposit = async (data) => {
  //set the header
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await client.post("deposit", data, config);

  return response.data.message;
};

//admin
const approveDeposit = async (data) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  console.log("about approving a deposit");
  const response = await client.patch(`deposit`, data, config);
  return response.data.message;
};

//admin
const declineDeposit = async (id) => {
  console.log("about declining a deposit");
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.delete(`deposit/decline/${id}`, config);
  console.log("deposit successfully declined i guess");
  return response.data.message;
};
//admin
const deleteDeposit = async (id) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    return console.log("No token and hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.delete(`deposit/${id}`, config);
  return response.data.message;
};

//for admin
const getAllDeposits = async () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  //the token will be reviewed in my backend to make sure the token belongs to an admin
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await client.get("deposit", config);
  return response.data.deposits;
};

//individual user
const getIndividualDepositHistory = async () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  console.log("we are about getting the individual deposit history");
  const response = await client.get("deposit/mydeposits", config);
  console.log("we just got our data");
  return response.data.deposits;
};

const depositService = {
  makeDeposit,
  approveDeposit,
  declineDeposit,
  getAllDeposits,
  deleteDeposit,
  getIndividualDepositHistory,
};

export default depositService;
