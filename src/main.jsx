import React from "react";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { reAuthenticate } from "./features/auth/authSlice";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "./context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";

// const token = localStorage.getItem("userToken");
// console.log(token);
// if (token) {
//   console.log(token);
//   store.dispatch(reAuthenticate(token));
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
