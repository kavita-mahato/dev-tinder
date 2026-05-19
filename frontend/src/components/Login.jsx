import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    // Redirect if already logged in
    useEffect(() => {
        if(user) {
            navigate("/feed", { replace: true });
        }
    }, [user, navigate]);

    // Basic validation for UX - backend handles strict validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "emailId") {
            setEmailId(value);
        } else if (name === "password") {
            setPassword(value);
        }
        
        if (error) setError("");
    };

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        
        setError("");
        
        // Basic required field check - backend validates
        if (!emailId.trim() || !password) {
            setError("Please fill in all required fields");
            return;
        }

        setIsLoading(true);
        try{
            const res = await axios.post(`${BASE_URL}/login`,{
                emailId: emailId.trim().toLowerCase(),
                password
            },
            {withCredentials: true}
            );
            dispatch(addUser(res.data)); // Save user to Redux
            navigate("/feed");
        }catch(err){
            if (!err.response) {
                setError(
                    "Cannot reach the API server. From the backend folder run `npm run dev` (port 3000) and ensure MongoDB is configured in backend/.env."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                        err.response?.data ||
                        "Invalid email or password"
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin(e);
        }
    };

  return (
    <div className="flex justify-center my-10 px-4">
        <div className="card bg-base-300 w-full max-w-md shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center text-2xl">Welcome Back</h2>
                <p className="text-center text-base-content/70 mb-6">
                    Sign in to continue to DevTinder
                </p>
                
                <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                        {/* Email Field */}
                        <div className="fieldset">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaEnvelope /> Email ID
                                </span>
                            </label>
                            <input
                                type="email"
                                name="emailId"
                                className="input input-primary w-full"
                                placeholder="abc@gmail.com"
                                value={emailId}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                autoComplete="email"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="fieldset">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaLock /> Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input input-primary w-full pr-10"
                                    placeholder="********"
                                    value={password}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-error mt-4">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="card-actions justify-center mt-6">
                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Login"}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="link link-primary">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;