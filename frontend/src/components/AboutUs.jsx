import React from "react";
import {
  FaCode,
  FaUsers,
  FaLightbulb,
  FaHeart,
  FaRocket,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">About DevTinder</h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            DevTinder is a developer-first networking platform designed to help
            programmers find the right people to build, learn, and grow with.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-base-content/80">
              We believe great software is built by great teams. DevTinder exists
              to remove the friction in finding compatible developers for
              collaboration, mentorship, and innovation.
            </p>
            <p className="text-base-content/80">
              Whether you're a beginner looking to learn or an experienced
              engineer building the next big thing, DevTinder helps you connect
              with developers who share your passion and vision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaUsers className="text-3xl text-secondary" />
                <p className="font-semibold">Community Driven</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaCode className="text-3xl text-secondary" />
                <p className="font-semibold">Built by Developers</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaLightbulb className="text-3xl text-secondary" />
                <p className="font-semibold">Idea Focused</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <FaHeart className="text-3xl text-secondary" />
                <p className="font-semibold">Meaningful Matches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why DevTinder */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Why DevTinder?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-base-200">
              <div className="card-body">
                <FaRocket className="text-2xl text-primary" />
                <h3 className="card-title">Fast Connections</h3>
                <p>
                  Quickly discover developers who match your tech stack and
                  interests.
                </p>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <FaUsers className="text-2xl text-primary" />
                <h3 className="card-title">Quality Over Quantity</h3>
                <p>
                  Smart matching helps you focus on meaningful collaborations.
                </p>
              </div>
            </div>

            <div className="card bg-base-200">
              <div className="card-body">
                <FaCode className="text-2xl text-primary" />
                <h3 className="card-title">Real Projects</h3>
                <p>
                  Built for real-world projects, startups, and open-source work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Build the future, together.
          </h3>
          <p className="mb-6 text-base-content/70">
            Join DevTinder and start collaborating with developers who share
            your passion.
          </p>
          <button className="btn btn-primary btn-wide">
            Join DevTinder
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;