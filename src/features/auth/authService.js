import client from "../../client";

const register = async (data) => {
  const response = await client.post("auth/register", data);
  if (response.data) {
    localStorage.setItem("userToken", response.data.token);
  }

  return response.data.user;
};

const login = async (data) => {
  const response = await client.post("auth/login", data);
  if (response.data) {
    localStorage.setItem("userToken", response.data.token);
  }
  return response.data.user;
};

const reAuthenticate = async (token) => {
  console.log("about to send a backend request");
  const response = await client.post("auth/reauthenticate", { token });
  console.log(response.data.user);
  return response.data.user;
};

const logout = () => {
  localStorage.removeItem("userToken");
};

const authService = { register, login, reAuthenticate, logout };

export default authService;
