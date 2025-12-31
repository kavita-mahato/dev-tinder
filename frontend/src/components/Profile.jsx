import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector(store => store.user);
  console.log(user);
  return (
    user && (
      <div className="flex justify-center">
    <div className="card card-side bg-base-300 shadow-sm w-8/12 my-15">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Full Name</h2>
        <p>About</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary"><Link to="/profile/edit">Edit Profile</Link></button>
        </div>
      </div>
    </div>
    </div>)
  )
}
export default Profile;