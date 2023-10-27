import client from "../../client";

//only for admin
const getUsers = async () => {
  console.log("about getting users");
  const token = localStorage.getItem("userToken");
  if (!token) {
    console.log("No token and hence not authorized");
  }

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.get("user", config);
  return response.data.users;
};

//only for admin
const getUser = async (id) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    console.log("No token and hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.get(`user/${id}`, config);
  return response.data.user;
};

const userService = { getUsers, getUser };

export default userService;
