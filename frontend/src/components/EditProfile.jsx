import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [age, setAge] = useState(user.age || '');
    const [gender, setGender] = useState(user.gender || '');
    const [about, setAbout] = useState(user.about || '');
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saveProfile = async () => {
        try {
            // Convert age to number if provided
            const ageNumber = age ? parseInt(age, 10) : undefined;
            
            // Prepare data object, only including fields that have non-empty values
            const updateData = {};
            if (firstName && firstName.trim()) updateData.firstName = firstName.trim();
            if (lastName && lastName.trim()) updateData.lastName = lastName.trim();
            if (photoUrl && photoUrl.trim()) updateData.photoUrl = photoUrl.trim();
            if (about && about.trim()) updateData.about = about.trim();
            if (ageNumber && !isNaN(ageNumber) && ageNumber >= 18) updateData.age = ageNumber;
            if (gender && gender.trim()) {
                const genderLower = gender.toLowerCase().trim();
                // Validate gender matches allowed values
                if (['male', 'female', 'other'].includes(genderLower)) {
                    updateData.gender = genderLower;
                }
            }

            const res = await axios.patch(
                `${BASE_URL}/profile/edit`,
                updateData,
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.user || res?.data));
            setError(''); // Clear any previous errors
        } catch (err) {
            // Backend sends error as plain string: "ERROR : {message}"
            const errorMessage = err.response?.data || err.message || 'Failed to update profile';
            setError(errorMessage);
            console.error('Error updating profile:', errorMessage);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-5">
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title justify-center">
                            Edit your Profile
                        </h2>
                        <div>
                            <div className="fieldset">
                                <div className="label">First Name</div>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="fieldset">
                                <div className="label">Last Name</div>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="fieldset">
                                <div className="label">Age</div>
                                <input
                                    type="number"
                                    className="input w-full"
                                    placeholder="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div className="fieldset">
                                <div className="label">Gender</div>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                            <div className="fieldset">
                                <div className="label">About</div>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Write something about yourself..."
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </div>
                            <div className="fieldset">
                                <legend className="label">
                                    Change Profile Picture
                                </legend>
                                <input
                                    type="text"
                                    className="input w-full"
                                    value={photoUrl}
                                    onChange={(e) =>
                                        setPhotoUrl(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <p className="text-red-500">{error}</p>
                        <div className="card-actions justify-center mt-3 ">
                            <button
                                className="btn btn-primary w-full"
                                onClick={saveProfile}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard
                user={{ firstName, lastName, photoUrl, about, age, gender }}
            />
        </div>
    );
};

export default EditProfile;
