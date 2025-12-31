import React from "react";
import { FaUsers, FaHandshake, FaRocket, FaCode, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Learn = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        const isLoggedIn = localStorage.getItem("token"); // or "user"

        if (isLoggedIn) {
        navigate("/feed");
        } else {
        navigate("/signup");
        }
    };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            Learn About DevTinder
          </h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            DevTinder is a platform built for developers to connect, collaborate,
            and create meaningful tech relationships — whether for projects,
            startups, or learning together.
          </p>
        </div>

        {/* Purpose Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <FaUsers className="text-4xl text-secondary" />
              <h2 className="card-title">Connect Developers</h2>
              <p>
                Find like-minded developers based on skills, interests, and goals.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <FaHandshake className="text-4xl text-secondary" />
              <h2 className="card-title">Collaborate Easily</h2>
              <p>
                Team up for hackathons, side projects, open-source, or startups.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <FaRocket className="text-4xl text-secondary" />
              <h2 className="card-title">Grow Faster</h2>
              <p>
                Learn from others, share knowledge, and accelerate your career.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            How DevTinder Works
          </h2>

          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary">
              <div className="flex items-center gap-2">
                <FaCode />
                <span>Create Your Profile</span>
              </div>
            </li>
            <li className="step step-primary">
              <div className="flex items-center gap-2">
                <FaUsers />
                <span>Discover Developers</span>
              </div>
            </li>
            <li className="step step-primary">
              <div className="flex items-center gap-2">
                <FaHeart />
                <span>Match & Connect</span>
              </div>
            </li>
            <li className="step step-primary">
              <div className="flex items-center gap-2">
                <FaRocket />
                <span>Build Together</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to find your next dev partner?
          </h3>
          <button className="btn btn-primary btn-wide" onClick={handleClick}>
            Get Started on DevTinder
          </button>
        </div>

      </div>
    </div>
  );
};

export default Learn;
