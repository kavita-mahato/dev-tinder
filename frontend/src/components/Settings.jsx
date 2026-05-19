import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Settings = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation must match.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/password`,
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      setMessage(res.data.message || "Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data ||
          err.message ||
          "Unable to update password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmed) return;

    setError("");
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/profile`, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data ||
          err.message ||
          "Unable to delete account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center p-6 bg-base-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Loading settings...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="card bg-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Settings</h2>
            <p className="mb-6 text-base-content/70">
              Manage your account, update your password, or delete your profile.
            </p>

            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Change Password</h3>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Current Password</span>
                  </label>
                  <input
                    type="password"
                    className="input input-primary w-full"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <input
                    type="password"
                    className="input input-primary w-full"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Confirm New Password</span>
                  </label>
                  <input
                    type="password"
                    className="input input-primary w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Account</h3>
              <p className="mb-4 text-base-content/70">
                Delete your account permanently. This action cannot be undone.
              </p>
              <button
                type="button"
                className="btn btn-error"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                Delete Account
              </button>
            </section>

            {message && (
              <div className="alert alert-success mt-4">
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
