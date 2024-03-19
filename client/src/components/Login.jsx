// Import useState and other necessary dependencies
import { useState } from "react";
import { z, ZodError } from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Please enter a username with at least 4 digits" }),
  password: z
    .string()
    .min(4, { message: "Please enter a password with at least 4 digits" }),
});

const Login = () => {
  // Define states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      loginSchema.parse({ username, password });

      const existingUserResponse = await axios.get(
        `http://localhost:3000/api/check-user/${username}`
      );
      if (!existingUserResponse.data.exists) {
        toast.error("User not found! Please create your account");
      } else {
        const response = await axios.post("http://localhost:3000/api/login", {
          username,
          password,
        });
        const user = response?.data?.user;

        console.log("Login successful", response);
        if (!user.token) {
          return navigate("/login");
        }
        localStorage.setItem("token", JSON.stringify(user.token));
        toast.success(`Hello ${username}`);
        if (user.role === "admin") {
          return navigate("/admin/dashboard");
        }
        await navigate("/user/dashboard");
      }

      setValidationErrors({});
      setUsername("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setValidationErrors(errors);
      } else if (error.response) {
        setLoginError(
          `Server error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        setLoginError(
          "No response received from the server. Please try again later."
        );
      } else {
        setLoginError("Something went wrong. Please try again later.");
      }

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form className="bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-center">Login</h2>
        <div className="grid gap-4 mt-4">
          <div className="grid grid-cols-1 items-center gap-2">
            <label htmlFor="username" className="text-sm">
              Username:
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`p-3 text-black border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                validationErrors.username && "border-red-500"
              }`}
              required
            />
            {validationErrors.username && (
              <p className="text-red-500 text-xs">{validationErrors.username}</p>
            )}
          </div>
          <div className="relative grid grid-cols-1 items-center gap-2">
            <label htmlFor="password" className="text-sm">
              Password:
            </label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`p-3 text-black border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                validationErrors.password && "border-red-500"
              }`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-0 text-sm"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
            {validationErrors.password && (
              <p className="text-red-500 text-xs">{validationErrors.password}</p>
            )}
          </div>
          <div className="text-center">
            <span>
              Not a user?{" "}
              <Link to="/signup" className="text-blue-400">
                Signup here
              </Link>
            </span>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 w-full mt-6"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {loginError && <p className="text-red-500 mt-4">{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;
