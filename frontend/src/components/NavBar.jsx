import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { 
    FaSignInAlt, 
    FaHandsHelping, 
    FaInfoCircle,
    FaUser,
    FaUsers,
    FaBell,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import { BASE_URL, DEFAULT_PHOTO_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { setSearchTerm } from "../utils/searchSlice";
import { IoBookSharp } from "react-icons/io5";
import logo from "../assets/logoImg.png";

const NavBar = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true});
      dispatch(removeUser());
      return navigate("/login");
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-2xl"><img
    src={logo}
    alt="DevTinder Logo"
    className="w-8 h-8"
  />DevTinder</Link>
          <Link to="/support"><button className="btn btn-ghost"><FaHandsHelping />Support</button></Link>
          <Link to="/about"><button className="btn btn-ghost"><FaInfoCircle />About Us</button></Link>
          <Link to="/learn"><button className="btn btn-ghost"><IoBookSharp />Learn</button></Link>
        </div>
        {user ? (
          // Logged in: profile pic, Hi firstName, search bar, support, about us, learn
          <div className="flex gap-2 items-center">
            <label className="input m-2">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search" onChange={(e) => dispatch(setSearchTerm(e.target.value))}/>
            </label>
            <div className="font-semibold text-xl">Hi,&nbsp;{user.firstName}</div>
            <div className="dropdown dropdown-end mr-4 ml-2">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Photo"
                    src={user.photoUrl || DEFAULT_PHOTO_URL}
                    onError={(e) => {
                      e.target.src = DEFAULT_PHOTO_URL;
                    }}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    <span className="flex items-center gap-2">
                      <FaUser /> Profile
                    </span>
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="flex items-center gap-2">
                    <FaUsers /> Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="flex items-center gap-2">
                    <FaBell /> Requests
                  </Link>
                </li>
                <li>
                  <a className="flex items-center gap-2">
                    <FaCog /> Settings
                  </a>
                </li>
                <li>
                  <Link onClick={handleLogout} className="flex items-center gap-2">
                    <FaSignOutAlt /> Log out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          // Not logged in: login, support, about us
          <div className="flex">
            <Link to="/login" className="btn btn-ghost text-lg"><FaSignInAlt/>Log in</Link>
          </div>
        )}
    </div>
  )
}

export default NavBar;