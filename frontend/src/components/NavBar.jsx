import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

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
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
          <button className="btn btn-ghost">Support</button>
          <button className="btn btn-ghost">About Us</button>
          <button className="btn btn-ghost">Learn</button>
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
              <input type="search" required placeholder="Search" />
            </label>
            <div className="font-semibold text-xl">Hi,&nbsp;{user.firstName}</div>
            <div className="dropdown dropdown-end mr-4 ml-2">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Photo"
                    src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to="/connections">Connections</Link></li>
                <li><Link to="/requests">Requests</Link></li>
                <li><a>Settings</a></li>
                <li><Link onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>
          </div>
        ) : (
          // Not logged in: login, support, about us
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <button className="btn btn-ghost">Support</button>
            <button className="btn btn-ghost">About Us</button>
          </div>
        )}
    </div>
  )
}

export default NavBar;