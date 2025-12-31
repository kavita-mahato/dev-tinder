import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("kavitamahato@gmail.com");
    const [password, setPassword] = useState("Kavita@03");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    // Redirect if already logged in
    useEffect(() => {
        if(user) {
            navigate("/feed", { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        try{
            const res = await axios.post(`${BASE_URL}/login`,{
                emailId,
                password
            },
            {withCredentials: true}
            );
            dispatch(addUser(res.data)); // Save user to Redux
            navigate("/feed");
        }catch(err){
            setError(err.response?.data?.message || "Invalid email or password");
        }
    }

  return (
    <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title justify-center">Welcome Back</h2>
                <div>
                    <div className="fieldset">
                        <div className="label">Email ID</div>
                        <input type="email" className="input w-full" placeholder="abc@gmail.com" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                    </div>
                    <div className="fieldset">
                        <div className="label">Password</div>
                        <input type="password" className="input w-full" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center mt-3 ">
                <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;