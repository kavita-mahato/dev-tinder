import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_PHOTO_URL } from "../utils/constants";
import { 
    FaUser, 
    FaEnvelope, 
    FaBirthdayCake, 
    FaUserTag, 
    FaInfoCircle, 
    FaCode, 
    FaEdit
} from "react-icons/fa";

const Profile = () => {
  const user = useSelector(store => store.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-base-content/70 mb-4">Please log in to view your profile</p>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    emailId,
    age,
    gender,
    about,
    photoUrl,
    skills = []
  } = user;

  const displayPhotoUrl = photoUrl || DEFAULT_PHOTO_URL;
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "User";
  const displayGender = gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : null;

  return (
    <div className="flex justify-center my-6 px-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 shadow-xl sticky top-6">
              <div className="card-body items-center text-center">
                {/* Profile Photo */}
                <div className="avatar mb-4">
                  <div className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-200 shadow-lg">
                    <img 
                      src={displayPhotoUrl} 
                      alt={fullName}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.src = DEFAULT_PHOTO_URL;
                      }}
                    />
                  </div>
                </div>

                {/* Name */}
                <h1 className="text-2xl font-bold mb-2 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {fullName}
                </h1>

                {/* Quick Info */}
                <div className="space-y-2 mb-4 w-full">
                  {emailId && (
                    <div className="flex items-center justify-center gap-2 text-sm text-base-content/70">
                      <FaEnvelope className="text-primary" />
                      <span className="break-all">{emailId}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-4 text-sm">
                    {age && (
                      <div className="flex items-center gap-1.5">
                        <FaBirthdayCake className="text-primary" />
                        <span>{age} years</span>
                      </div>
                    )}
                    {displayGender && (
                      <div className="flex items-center gap-1.5">
                        <FaUserTag className="text-primary" />
                        <span>{displayGender}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <Link 
                  to="/profile/edit" 
                  className="btn btn-primary btn-sm w-full gap-2"
                >
                  <FaEdit /> Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            {about && (
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-lg mb-3 flex items-center gap-2">
                    <div className="p-1.5 bg-primary/20 rounded-lg">
                      <FaInfoCircle className="text-primary text-sm" />
                    </div>
                    About
                  </h2>
                  <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">
                    {about}
                  </p>
                </div>
              </div>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-lg mb-3 flex items-center gap-2">
                    <div className="p-1.5 bg-primary/20 rounded-lg">
                      <FaCode className="text-primary text-sm" />
                    </div>
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="badge badge-primary px-3 py-2 text-sm font-semibold"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Details */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-primary/20 rounded-lg">
                    <FaUser className="text-primary text-sm" />
                  </div>
                  Profile Details
                </h2>
                
                <div className="space-y-4">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {firstName && (
                      <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FaUser className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                            First Name
                          </div>
                          <div className="text-base font-semibold text-base-content">
                            {firstName}
                          </div>
                        </div>
                      </div>
                    )}

                    {lastName && (
                      <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FaUser className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                            Last Name
                          </div>
                          <div className="text-base font-semibold text-base-content">
                            {lastName}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Age & Gender Row */}
                  {(age || gender) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {age && (
                        <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FaBirthdayCake className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                              Age
                            </div>
                            <div className="text-base font-semibold text-base-content">
                              {age} years old
                            </div>
                          </div>
                        </div>
                      )}

                      {gender && (
                        <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FaUserTag className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                              Gender
                            </div>
                            <div className="text-base font-semibold text-base-content">
                              {displayGender}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Email Row */}
                  {emailId && (
                    <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FaEnvelope className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                          Email Address
                        </div>
                        <div className="text-base font-semibold text-base-content break-all">
                          {emailId}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;