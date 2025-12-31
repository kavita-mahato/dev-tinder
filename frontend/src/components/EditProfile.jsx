import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    FaUser,
    FaBirthdayCake,
    FaUserTag,
    FaInfoCircle,
    FaImage,
    FaSave,
    FaTimes
} from 'react-icons/fa';

import { BASE_URL, DEFAULT_PHOTO_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ ALL HOOKS FIRST (NO CONDITIONS)
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [age, setAge] = useState(user?.age || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [about, setAbout] = useState(user?.about || '');
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ REDIRECT AFTER HOOKS
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    // ---------------- VALIDATION ----------------
    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'firstName':
                if (value.trim() && value.trim().length > 20) {
                    newErrors.firstName = 'First name must be less than 20 characters';
                } else {
                    delete newErrors.firstName;
                }
                break;

            case 'age':
                if (value) {
                    const ageNum = parseInt(value, 10);
                    if (isNaN(ageNum) || ageNum < 18) {
                        newErrors.age = 'Age must be at least 18 years';
                    } else {
                        delete newErrors.age;
                    }
                } else {
                    delete newErrors.age;
                }
                break;

            case 'photoUrl':
                if (value?.trim()) {
                    try {
                        new URL(value.trim());
                        delete newErrors.photoUrl;
                    } catch {
                        newErrors.photoUrl = 'Please enter a valid URL';
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

        if (name === 'firstName') setFirstName(value);
        else if (name === 'lastName') setLastName(value);
        else if (name === 'age') setAge(value);
        else if (name === 'gender') setGender(value);
        else if (name === 'about') setAbout(value);
        else if (name === 'photoUrl') setPhotoUrl(value);

        if (error) setError('');
        validateField(name, value);
    };

    const saveProfile = async () => {
        setError('');

        if (
            !validateField('firstName', firstName) ||
            !validateField('age', age) ||
            !validateField('photoUrl', photoUrl)
        ) {
            setError('Please fix the errors in the form');
            return;
        }

        setIsLoading(true);

        try {
            const updateData = {};

            if (firstName.trim()) updateData.firstName = firstName.trim();
            if (lastName.trim()) updateData.lastName = lastName.trim();
            if (about.trim()) updateData.about = about.trim();
            if (photoUrl.trim()) updateData.photoUrl = photoUrl.trim();
            if (gender.trim()) updateData.gender = gender.trim().toLowerCase();

            if (age) {
                const ageNumber = parseInt(age, 10);
                if (!isNaN(ageNumber)) updateData.age = ageNumber;
            }

            const res = await axios.patch(
                `${BASE_URL}/profile/edit`,
                updateData,
                { withCredentials: true }
            );

            dispatch(addUser(res?.data?.user || res?.data));

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/profile');
            }, 2000);
        } catch (err) {
            setError(err.response?.data || err.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const displayPhotoUrl = photoUrl || DEFAULT_PHOTO_URL;

    return (
        <>
            <div className="flex justify-center my-6 px-4">
                <div className="w-full max-w-4xl">
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                                <FaUser className="text-primary" />
                                Edit Profile
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div>
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaUser /> First Name
                                        </span>
                                    </label>
                                    <input
                                        name="firstName"
                                        value={firstName}
                                        onChange={handleInputChange}
                                        onBlur={() => validateField('firstName', firstName)}
                                        maxLength={20}
                                        className={`input w-full ${errors.firstName ? 'input-error' : 'input-primary'}`}
                                    />
                                    {errors.firstName && (
                                        <span className="text-error text-sm">{errors.firstName}</span>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaUser /> Last Name
                                        </span>
                                    </label>
                                    <input
                                        name="lastName"
                                        value={lastName}
                                        onChange={handleInputChange}
                                        className="input input-primary w-full"
                                    />
                                </div>

                                {/* Age */}
                                <div>
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaBirthdayCake /> Age
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={age}
                                        onChange={handleInputChange}
                                        onBlur={() => validateField('age', age)}
                                        className={`input w-full ${errors.age ? 'input-error' : 'input-primary'}`}
                                    />
                                    {errors.age && (
                                        <span className="text-error text-sm">{errors.age}</span>
                                    )}
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaUserTag /> Gender
                                        </span>
                                    </label>
                                    <select
                                        name="gender"
                                        value={gender}
                                        onChange={handleInputChange}
                                        className="select select-primary w-full"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* About */}
                                <div className="md:col-span-2">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaInfoCircle /> About
                                        </span>
                                    </label>
                                    <textarea
                                        name="about"
                                        value={about}
                                        onChange={handleInputChange}
                                        className="textarea textarea-primary w-full"
                                        rows={4}
                                    />
                                </div>

                                {/* Photo URL */}
                                <div className="md:col-span-2">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaImage /> Photo URL
                                        </span>
                                    </label>
                                    <input
                                        name="photoUrl"
                                        value={photoUrl}
                                        onChange={handleInputChange}
                                        onBlur={() => validateField('photoUrl', photoUrl)}
                                        className={`input w-full ${errors.photoUrl ? 'input-error' : 'input-primary'}`}
                                    />
                                    {errors.photoUrl && (
                                        <span className="text-error text-sm">{errors.photoUrl}</span>
                                    )}

                                    <div className="mt-4">
                                        <img
                                            src={displayPhotoUrl}
                                            alt="Preview"
                                            className="w-24 h-24 rounded-full ring ring-primary"
                                            onError={(e) => {
                                                e.target.src = DEFAULT_PHOTO_URL;
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="alert alert-error mt-4">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-6">
                                <button className="btn btn-ghost" onClick={() => navigate('/profile')}>
                                    <FaTimes /> Cancel
                                </button>
                                <button
                                    className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                                    onClick={saveProfile}
                                    disabled={isLoading}
                                >
                                    {!isLoading && <FaSave />}
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        Profile saved successfully! Redirecting...
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;
