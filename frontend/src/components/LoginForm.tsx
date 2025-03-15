import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormFields = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: FormFields) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/id");
    } catch (error) {
      setError("email", {
        message: "Invalid email or password.",
      });
      setError("password", {
        message: "Invalid email or password.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen lg:p-[50px] md:p-[50px] sm:p-[50px] xs:p-[20px] xs:py-[50px] py-[50px] px-[10px] min-h-[720px]">
      {/* First Div (Image Section) */}
      <div className="sm:w-full lg:w-2/5 w-[0px] hidden p-3 bg-[url('../src/assets/login.png')] bg-no-repeat bg-cover bg-center h-full sm:flex sm:flex-col sm:justify-center sm:items-center rounded-l-3xl max-w-[550px]"></div>

      {/* Second Div (Form Section) */}
      <div className="sm:w-full lg:w-1/3 w-full p-6 shadow-lg bg-[#FFDCD6] h-full flex flex-col justify-center sm:rounded-r-3xl sm:rounded rounded-3xl max-w-[550px]">
        <h2 className="text-[13px] text-gray-700 text-left mb-1 mt-6">
          WELCOME BACK
        </h2>
        <h3 className="text-[23px] text-black text-left mb-5">
          Log In to your Account
        </h3>
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-[13px] text-gray-500 absolute left-4 bottom-[33px] bg-[#FFDCD6] px-[10px]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="johndoe@example.com"
              className="w-full mt-1 p-2 border border-gray-500 bg-[#FFDCD6] rounded-lg focus:outline-1 focus:outline-black"
              required
            />
            {errors.email && (
              <div className="absolute text-red-500 text-sm z-50">
                {errors.email.message}
              </div>
            )}
          </div>
          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-[13px] text-gray-500 absolute left-2 bottom-[33px] bg-[#FFDCD6] px-[10px]"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder="********"
              className="w-full mt-1 p-2 border border-gray-500 bg-[#FFDCD6] rounded-lg focus:outline-1 focus:outline-black"
              required
            />
            {errors.password && (
              <div className="absolute text-red-500 text-sm z-50">
                {errors.password.message}
              </div>
            )}
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img
                  src="../src/assets/icons/open-eye.svg"
                  alt="Hide password"
                  className="w-5 h-5 mt-1"
                />
              ) : (
                <img
                  src="../src/assets/icons/closed-eye.svg"
                  alt="Show password"
                  className="w-5 h-5 mt-1"
                />
              )}
            </span>
          </div>
          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Remember me
            </label>
            <a href="" className="text-sm hover:underline text-gray-600">
              Forgot Password?
            </a>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-black text-white text-[14px] rounded-lg hover:bg-gray-800 h-12"
          >
            {isSubmitting ? "LOADING..." : "CONTINUE"}
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-500" />
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-500" />
        </div>
        {/* Social Login Buttons */}
        <div className="space-y-3 flex flex-col items-center">
          {/* Google Button */}
          <button className="w-full flex items-center relative py-2 px-4 bg-white text-gray-500 font-light rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 text-[13px]">
            <img
              src="../src/assets/icons/google.png"
              alt="Google"
              className="w-5 h-5 absolute left-4"
            />
            <span className="w-full text-center">Log In with Google</span>
          </button>

          {/* Facebook Button */}
          <button className="w-full flex items-center relative py-2 px-4 bg-white text-gray-500 font-light rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 text-[13px]">
            <img
              src="../src/assets/icons/facebook.png"
              alt="Facebook"
              className="w-5 h-5 absolute left-4"
            />
            <span className="w-full text-center">Log In with Facebook</span>
          </button>

          {/* Apple Button */}
          <button className="w-full flex items-center relative py-2 px-4 bg-white text-gray-500 font-light rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 text-[13px]">
            <img
              src="../src/assets/icons/apple.png"
              alt="Apple"
              className="absolute left-4 h-5"
            />
            <span className="w-full text-center">Log In with Apple</span>
          </button>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          New User?{" "}
          <Link
            to="/register"
            className="text-[#EE4C0C] hover:underline font-medium"
          >
            SIGN UP HERE
          </Link>
        </p>

        {/* Return to Homepage */}
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link to="/" className="text-[#EE4C0C] hover:underline font-medium">
            Return to Homepage
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
