import { Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../utils/auth";
import { toast } from "react-toastify";

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup.string().required("Email required").email("Invalid email format"),
  password: yup
    .string()
    .required("Password required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), ""], "Passwords don't match"),
});

const Signup = () => {
  const navigate = useNavigate();
  const INITIAL_VALUES = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await api.post("/user-registration", values);
      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/signin");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center shadow-lg shadow-black border-2 bg-[#f0f0f0] min-h-screen">
      <div className="h-fit bg-white p-[25px] sm:px-[50px] sm:py-[30px] shadow-lg shadow-[#b0b0b0] rounded-xl">
        <p className="text-xl font-bold text-[#202020]">Signup Here!</p>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form>
              <p className="text-[14px] mt-[20px] font-semibold text-[#202020]">Name</p>
              <input
                name="name"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                className="text-[14px] sm:text-[15px] border-[1px] border-[#c0c0c0] w-full text-black h-[40px] sm:h-[50px] rounded-md px-[12px] outline-none"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-[15px]" />
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
                className="outline-none text-[14px] sm:text-[15px] border-[1px] border-[#c0c0c0] h-[40px] sm:h-[50px] rounded-md px-[12px] w-full"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-[15px]" />
              <p className="text-[14px] mt-[20px] font-semibold text-[#202020]">Confirm Password</p>
              <input
                name="confirmPassword"
                placeholder="Re-enter your Password"
                value={values.confirmPassword}
                onChange={handleChange}
                className="outline-none text-[14px] sm:text-[15px] border-[1px] border-[#c0c0c0] h-[40px] sm:h-[50px] rounded-md px-[12px] w-full"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-[15px]"
              />

              <button
                type="submit"
                onClick={() => handleSubmit}
                className="outline-none bg-[#0039a6] text-white text-[20px] h-[40px] sm:h-[50px] px-[20px] rounded-lg my-[20px] w-full"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>

        <div className="flex flex-row justify-center">
          <p className="pr-[5px]">Already have an account?</p>
          <p className="font-semibold cursor-pointer" onClick={() => navigate("/signin")}>
            {" "}
            Login here
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
