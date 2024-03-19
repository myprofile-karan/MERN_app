// Import useState and other necessary dependencies
import { useState } from "react";
import { z, ZodError } from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Define validation schema
const SignupSchema = z.object({
  username: z.string().min(4, { message: "Please enter a username with at least 4 characters" }),
  email: z.string().email(),
  password: z.string().min(4, { message: "Please enter a password with at least 4 characters" }),
});

// Define Signup component
const Signup = () => {
  // Define states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input data
      SignupSchema.parse({ username, email, password });

      // Send signup request
      const response = await axios.post("http://localhost:3000/api/signup", {
        username,
        email,
        password,
      });
      console.log(response);

      // Show success message and navigate to login page
      await toast.success("Signup successful");
      navigate("/login");

      // Reset form and state
      setValidationErrors({});
      setUsername("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      // Handle validation errors, server errors, and network errors
      if (error instanceof ZodError) {
        const errors = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setValidationErrors(errors);
      } else if (error.response) {
        setSignupError(
          `Server error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        setSignupError(
          "No response received from the server. Please try again later."
        );
      } else {
        setSignupError("Something went wrong. Please try again later.");
      }

      setLoading(false);
    }
  };

  // Return JSX for Signup component
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form className="bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-center">
          Create an account
        </h2>
        <div className="grid gap-4 mt-4">
          {/* Username input */}
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

          {/* Email input */}
          <div className="grid grid-cols-1 items-center gap-2">
            <label htmlFor="email" className="text-sm">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className={`p-3 text-black border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                validationErrors.email && "border-red-500"
              }`}
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs">{validationErrors.email}</p>
            )}
          </div>

          {/* Password input */}
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

          {/* Navigate to login */}
          <div className="text-center">
            <span>
              Already a user?{" "}
              <Link to="/login" className="text-blue-400">
                Login here
              </Link>
            </span>
          </div>
        </div>

        {/* Signup button */}
        <button
          onClick={handleSignup}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 w-full mt-6"
        >
          {loading ? "Signing up..." : "Create an account"}
        </button>

        {/* Error message */}
        {signupError && <p className="text-red-500 mt-4">{signupError}</p>}
      </form>
    </div>
  );
};

// Export Signup component
export default Signup;
