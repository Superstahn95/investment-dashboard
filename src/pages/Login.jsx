import { Formik, Form } from "formik";
import * as Yup from "Yup";
import MyTextInput from "../components/MyTextInput";
import ladyImg from "../assets/images/lady-sitting.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isLoading, isError, user, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      //i'll be handling this in a better way
      alert(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch, navigate]);
  const initialData = {
    email: "",
    password: "",
  };
  return (
    <main className="min-h-screen w-full  grid grid-cols-2">
      <div className="flex items-center  justify-center bg-slate-900">
        <img src={ladyImg} alt="login image" />
      </div>
      <div className="flex items-center justify-center ">
        <div className="w-[90%] h-[70%] px-3 rounded-md shadow-xl">
          <h2 className="font-montserrat text-gray-700 text-3xl font-bold py-3 text-center">
            Sign In
          </h2>
          <p className="text-gray-700 font-montserrat text-sm text-center ">
            <span className="font-bold text-orange-500"> Welcome back!!! </span>
            Sign in to continue earning
          </p>
          <Formik
            initialValues={initialData}
            validationSchema={Yup.object({
              email: Yup.string().required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={(values) => {
              dispatch(login(values));
            }}
          >
            <Form>
              <MyTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />

              <p className="text-xs text-gray-700 font-montserrat">
                Don't have an account?{" "}
                <Link to={"/register"} className="text-orange-500">
                  Sign up
                </Link>
              </p>
              <div className="my-2">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-2 py-3 rounded-r-md rounded-tl-md w-full cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
}

export default Login;
