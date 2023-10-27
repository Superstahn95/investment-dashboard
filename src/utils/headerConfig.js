//try using this later
const headerConfig = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export default headerConfig;
