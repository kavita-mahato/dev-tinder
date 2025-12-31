import React from "react";
import {
  FaQuestionCircle,
  FaEnvelope,
  FaBug,
  FaUserShield,
  FaTools,
  FaLifeRing,
} from "react-icons/fa";

const Support = () => {
  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Support</h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Need help with DevTinder? We’re here to support you at every step —
            from account setup to collaboration issues.
          </p>
        </div>

        {/* Support Categories */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <FaQuestionCircle className="text-3xl text-secondary" />
              <h2 className="card-title">General Help</h2>
              <p>
                Learn how DevTinder works, manage your profile, and get started
                quickly.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <FaBug className="text-3xl text-secondary" />
              <h2 className="card-title">Report a Bug</h2>
              <p>
                Found an issue or something not working? Let us know and we’ll
                fix it.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <FaUserShield className="text-3xl text-secondary" />
              <h2 className="card-title">Account & Safety</h2>
              <p>
                Get help with login issues, privacy settings, or reporting users.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-lg font-medium">
                Is DevTinder free to use?
              </div>
              <div className="collapse-content">
                <p>
                  Yes! DevTinder is free to use with core features available to
                  all developers.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium">
                How do matches work?
              </div>
              <div className="collapse-content">
                <p>
                  Matches are based on shared skills, interests, and goals.
                  When both users show interest, a connection is made.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium">
                How can I report a user?
              </div>
              <div className="collapse-content">
                <p>
                  You can report a user directly from their profile. Our team
                  reviews all reports carefully.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <FaEnvelope className="text-3xl text-primary" />
              <h2 className="card-title">Contact Support</h2>
              <p>
                Still need help? Reach out to our support team and we’ll get back
                to you as soon as possible.
              </p>
              <div className="card-actions">
                <button className="btn btn-primary">
                  Email Support
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <FaTools className="text-3xl text-primary" />
              <h2 className="card-title">Developer Help</h2>
              <p>
                Facing technical issues or API problems? Our dev-focused support
                has you covered.
              </p>
              <div className="card-actions">
                <button className="btn btn-outline btn-primary">
                  View Docs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <FaLifeRing className="text-4xl text-secondary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">
            We’re here to help you succeed
          </h3>
          <p className="text-base-content/70 mb-6">
            Don’t hesitate to reach out — DevTinder is better when developers
            support each other.
          </p>
          <button className="btn btn-secondary btn-wide">
            Go to Help Center
          </button>
        </div>

      </div>
    </div>
  );
};

export default Support;
