import { Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../utils/auth";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const VALIDATION_SCHEMA = yup.object({
  email: yup.string().required("Email required").email("Invalid email format"),
  password: yup
    .string()
    .required("Password required")
    .min(6, "Password must be at least 6 characters long"),
});

const Signin = () => {
  const cookies = new Cookies(null, { path: "/" });
  const navigate = useNavigate();
  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await api.post("/user-login", values);

      console.log(response?.data.refreshToken, "checking");
      if (response.status === 200 && response?.data) {
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        cookies.set("AppAccessToken", accessToken);
        cookies.set("AppRefreshToken", refreshToken);
        toast.success("Successfully Logged in");

        // if (refreshToken) {
        //   try {
        //     const ttest = await api.get("/refresh-token", {
        //       headers: {
        //         "x-refresh-token":
        //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGFlODFlNzhmZmRmNTc4M2MyYzAzYyIsImlhdCI6MTcwMzc5MzM5OSwiZXhwIjoxNzAzNzkzNTc5fQ.3VWJfXN0wESyvFfWeC-Fg7Z-WEthKM3P2u1z0d9nKAM",
        //       },
        //     });
        //   } catch (error) {
        //     console.log("cathced");
        //     window.location.reload();
        //   }
        // }
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center border-2 bg-[#f0f0f0] min-h-screen">
      <div className="h-fit min-w-[400px] max-w-[80%] shadow-lg shadow-[#b0b0b0] sm:w-fit bg-white p-[25px] sm:px-[50px] sm:py-[30px] rounded-xl">
        <p className="text-xl font-bold text-[#202020]">Signin Here!</p>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form>
              <p className="text-[14px] mt-[20px] font-semibold text-[#202020]">Email</p>
              <input
                name="email"
                placeholder="Type your Email"
                value={values.email}
                onChange={handleChange}
                className="text-[14px] sm:text-[15px] border-[1px] border-[#c0c0c0] w-full text-black h-[40px] sm:h-[50px] rounded-md px-[12px] outline-none"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-[15px]" />
              <p className="text-[14px] mt-[20px] font-semibold text-[#202020]">Password</p>
              <input
                name="password"
                placeholder="Type your Password"
                value={values.password}
                onChange={handleChange}
                className="text-[14px] sm:text-[15px] outline-none border-[1px] border-[#c0c0c0] h-[40px] sm:h-[50px] rounded-md px-[12px] py-[5px] w-full"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-[15px]" />
              <div className="flex flex-row items-center justify-between mt-[15px]">
                <div className="flex flex-row">
                  <input type="checkbox" />
                  <p className="pl-[5px] text-[14px] sm:text-[15px]"> Remember me</p>
                </div>
                <p onClick={() => console.log("")} className="text-[14px] sm:text-[15px]">
                  Forgot Password?
                </p>
              </div>
              <button
                type="submit"
                onClick={() => handleSubmit}
                className="outline-none bg-[#0039a6] text-white text-[20px] h-[40px] sm:h-[50px] p-au rounded-lg my-[20px] w-full"
              >
                Signin
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col sm:flex-row justify-center">
          <p className="pr-[5px] text-[14px] sm:text-[15x-px]">Dont have an account?</p>
          <p
            className="font-semibold cursor-pointer text-[14px] sm:text-[15px]"
            onClick={() => navigate("/signup")}
          >
            Register here
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signin;
