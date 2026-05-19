import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { 
    FaUser, 
    FaEnvelope, 
    FaLock, 
    FaBirthdayCake, 
    FaUserTag, 
    FaInfoCircle, 
    FaCode, 
    FaImage,
    FaTimes,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { addUser } from "../utils/userSlice";
import { BASE_URL, DEFAULT_PHOTO_URL } from "../utils/constants";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        age: "",
        gender: "",
        about: "",
        photoUrl: "",
        skills: []
    });
    
    const [skillInput, setSkillInput] = useState("");
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
    const validateField = (name, value) => {
        const newErrors = { ...errors };
        
        switch(name) {
            case "firstName":
                if (!value.trim()) {
                    newErrors.firstName = "First name is required";
                } else if (value.trim().length > 20) {
                    newErrors.firstName = "First name must be less than 20 characters";
                } else {
                    delete newErrors.firstName;
                }
                break;
            
            case "lastName":
                if (!value.trim()) {
                    newErrors.lastName = "Last name is required";
                } else {
                    delete newErrors.lastName;
                }
                break;
            
            case "emailId":
                if (!value.trim()) {
                    newErrors.emailId = "Email is required";
                } else {
                    delete newErrors.emailId;
                }
                break;
            
            case "password":
                if (!value) {
                    newErrors.password = "Password is required";
                } else {
                    delete newErrors.password;
                }
                break;
            
            case "age":
                if (!value) {
                    newErrors.age = "Age is required";
                } else {
                    const ageNum = parseInt(value, 10);
                    if (isNaN(ageNum) || ageNum < 18) {
                        newErrors.age = "Age must be at least 18 years";
                    } else {
                        delete newErrors.age;
                    }
                }
                break;
            
            case "gender":
                if (!value) {
                    newErrors.gender = "Gender is required";
                } else {
                    delete newErrors.gender;
                }
                break;
            
            case "about":
                if (!value.trim()) {
                    newErrors.about = "About is required";
                } else {
                    delete newErrors.about;
                }
                break;
            
            case "photoUrl":
                if (value && value.trim()) {
                    try {
                        new URL(value.trim());
                        delete newErrors.photoUrl;
                    } catch {
                        newErrors.photoUrl = "Please enter a valid URL";
                    }
                } else {
                    delete newErrors.photoUrl;
                }
                break;
            
            default:
                break;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Validate on change
        validateField(name, value);
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()]
            }));
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const validateForm = () => {
        const requiredFields = ["firstName", "lastName", "emailId", "password", "age", "gender", "about"];
        return requiredFields.every(field => validateField(field, formData[field])) &&
               (!formData.photoUrl || validateField("photoUrl", formData.photoUrl));
    };

    const handleSignUp = async () => {
        setError("");
        
        if (!validateForm()) {
            setError("Please fix the errors in the form");
            return;
        }

        try {
            const signUpData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                emailId: formData.emailId.trim().toLowerCase(),
                password: formData.password,
                age: parseInt(formData.age, 10),
                gender: formData.gender.toLowerCase(),
                about: formData.about.trim(),
                ...(formData.photoUrl.trim() && { photoUrl: formData.photoUrl.trim() }),
                ...(formData.skills.length > 0 && { skills: formData.skills })
            };

            await axios.post(
                `${BASE_URL}/signup`,
                signUpData,
                { withCredentials: true }
            );
            
            // After successful signup, try to login
            const loginRes = await axios.post(
                `${BASE_URL}/login`,
                {
                    emailId: signUpData.emailId,
                    password: signUpData.password
                },
                { withCredentials: true }
            );
            
            dispatch(addUser(loginRes.data));
            navigate("/profile");
        } catch (err) {
            if (!err.response) {
                setError(
                    "Cannot reach the API server. Start the backend (port 3000) and ensure MongoDB is set in backend/.env."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                        err.response?.data ||
                        err.message ||
                        "Sign up failed. Please try again."
                );
            }
        }
    };

    return (
        <div className="flex justify-center my-10 px-4">
            <div className="card bg-base-300 w-full max-w-2xl shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl">Create Your Account</h2>
                    <p className="text-center text-base-content/70 mb-6">
                    Connect, collaborate, and grow with DevTinder.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div className="fieldset md:col-span-1">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaUser /> First Name
                                </span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                className={`input w-full ${errors.firstName ? 'input-error' : 'input-primary'}`}
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                onBlur={() => validateField("firstName", formData.firstName)}
                            />
                            {errors.firstName && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.firstName}</span>
                                </label>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className="fieldset md:col-span-1">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaUser /> Last Name
                                </span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                className={`input w-full ${errors.lastName ? 'input-error' : 'input-primary'}`}
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                onBlur={() => validateField("lastName", formData.lastName)}
                            />
                            {errors.lastName && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.lastName}</span>
                                </label>
                            )}
                        </div>

                        {/* Email */}
                        <div className="fieldset md:col-span-2">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaEnvelope /> Email ID
                                </span>
                            </label>
                            <input
                                type="email"
                                name="emailId"
                                className={`input w-full ${errors.emailId ? 'input-error' : 'input-primary'}`}
                                placeholder="john.doe@example.com"
                                value={formData.emailId}
                                onChange={handleInputChange}
                                onBlur={() => validateField("emailId", formData.emailId)}
                            />
                            {errors.emailId && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.emailId}</span>
                                </label>
                            )}
                        </div>

                        {/* Password */}
                        <div className="fieldset md:col-span-2">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaLock /> Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className={`input w-full pr-10 ${errors.password ? 'input-error' : 'input-primary'}`}
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onBlur={() => validateField("password", formData.password)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.password}</span>
                                </label>
                            )}
                        </div>

                        {/* Age */}
                        <div className="fieldset md:col-span-1">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaBirthdayCake /> Age
                                </span>
                            </label>
                            <input
                                type="number"
                                name="age"
                                className={`input w-full ${errors.age ? 'input-error' : 'input-primary'}`}
                                placeholder="25"
                                min="18"
                                value={formData.age}
                                onChange={handleInputChange}
                                onBlur={() => validateField("age", formData.age)}
                            />
                            {errors.age && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.age}</span>
                                </label>
                            )}
                        </div>

                        {/* Gender */}
                        <div className="fieldset md:col-span-1">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaUserTag /> Gender
                                </span>
                            </label>
                            <select
                                name="gender"
                                className={`select w-full ${errors.gender ? 'select-error' : 'select-primary'}`}
                                value={formData.gender}
                                onChange={handleInputChange}
                                onBlur={() => validateField("gender", formData.gender)}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.gender}</span>
                                </label>
                            )}
                        </div>

                        {/* About */}
                        <div className="fieldset md:col-span-2">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaInfoCircle /> About
                                </span>
                            </label>
                            <textarea
                                name="about"
                                className={`textarea w-full ${errors.about ? 'textarea-error' : 'textarea-primary'}`}
                                placeholder="Tell us about yourself..."
                                rows="4"
                                value={formData.about}
                                onChange={handleInputChange}
                                onBlur={() => validateField("about", formData.about)}
                            />
                            {errors.about && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.about}</span>
                                </label>
                            )}
                        </div>

                        {/* Photo URL */}
                        <div className="fieldset md:col-span-2">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaImage /> Photo URL (Optional)
                                </span>
                            </label>
                            <input
                                type="url"
                                name="photoUrl"
                                className={`input w-full ${errors.photoUrl ? 'input-error' : 'input-primary'}`}
                                placeholder="https://example.com/photo.jpg"
                                value={formData.photoUrl}
                                onChange={handleInputChange}
                                onBlur={() => validateField("photoUrl", formData.photoUrl)}
                            />
                            {errors.photoUrl && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.photoUrl}</span>
                                </label>
                            )}
                        </div>

                        {/* Skills */}
                        <div className="fieldset md:col-span-2">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaCode /> Skills (Optional)
                                </span>
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    className="input input-primary flex-1"
                                    placeholder="Add a skill (e.g., React, Node.js)"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddSkill}
                                >
                                    Add
                                </button>
                            </div>
                            {formData.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map((skill, index) => (
                                        <div key={index} className="badge badge-primary badge-lg gap-2">
                                            {skill}
                                            <FaTimes 
                                                className="cursor-pointer" 
                                                onClick={() => handleRemoveSkill(skill)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-error mt-4">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="card-actions justify-center mt-6">
                        <button 
                            className="btn btn-primary w-full md:w-auto min-w-50" 
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;