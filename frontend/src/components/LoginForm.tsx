import { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen lg:p-20 md:p-10 sm:p-[50px] p-[20px]">
      <div className="sm:w-full md:w-2/5 w-[0px] hidden sm:block p-3 bg-[url('../src/assets/loginImage.png')] bg-no-repeat bg-cover bg-center h-full rounded-l-3xl"></div>
      <div className="sm:w-full md:w-1/3 w-full p-6 shadow-lg bg-[#FFDCD6] h-full sm:rounded-r-3xl sm:rounded rounded-3xl">
        <h2 className="text-[13px] text-gray-700 text-left mb-1 mt-6">
          WELCOME BACK
        </h2>
        <h3 className="text-[23px] text-black text-left mb-5">
          Log In to your Account
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              className="w-full mt-1 p-2 border border-gray-600 bg-[#FFDCD6] rounded-lg focus:outline-none focus:ring focus:ring-[#EF5C0C]"
              required
            />
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full mt-1 p-2 border border-gray-600 bg-[#FFDCD6] rounded-lg focus:outline-none focus:ring focus:ring-[#EF5C0C]"
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
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
            CONTINUE
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        {/* Social Login Buttons */}
        <div className="space-y-3">
          {/* Google Button */}
          <button className="w-full flex items-center relative py-2 px-4 bg-white text-gray-500 font-light rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 text-[15px]">
            <img
              src="../src/assets/icon_google.png"
              alt="Google"
              className="w-5 h-5 absolute left-4"
            />
            <span className="w-full text-center">Log In with Google</span>{" "}
          </button>

          {/* Facebook Button */}
          <button className="w-full flex items-center relative py-2 px-4 bg-white text-gray-500 font-light rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 text-[15px]">
            <img
              src="../src/assets/icon_fb.png"
              alt="Facebook"
              className="w-5 h-5 absolute left-4"
            />
            <span className="w-full text-center">Log In with Facebook</span>{" "}
          </button>

          {/* Apple Button */}
          <button className="w-full flex items-center relative py-2 px-4 bg-white text-gray-500 font-light rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 text-[15px]">
            <img
              src="../src/assets/icon_apple.png"
              alt="Apple"
              className="absolute left-4 w-5 h-5"
            />
            <span className="w-full text-center">Log In with Apple</span>{" "}
          </button>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          New User?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            SIGN UP HERE
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
