import React from "react";

const About = () => {
  const team = [
    { name: "Pranay Nawale", role: "Java Full Stack Developer" },
    { name: "Anisha Malore", role: "Java Full Stack Developer" },
    { name: "Prachi Nikam", role: "Java Full Stack Developer" },
    { name: "Sahil Malusare", role: "Java Full Stack Developer" }
  ];

  return (
    <div className="bg-soft pt-20">

      {/* ================= HERO ================= */}
      <section className="section bg-hero relative overflow-hidden">

        <div className="section-inner text-center relative z-10">
          <span className="section-eyebrow bg-purple-100 text-purple-700 anim-fade-0">
            About Us
          </span>

          <h1 className="section-title text-grad-primary anim-fade-1">
            Building Smarter Campus Experiences
          </h1>

          <p className="section-desc anim-fade-2">
            We simplify event management and enhance student engagement through
            smart digital solutions.
          </p>

          <div className="mt-6 anim-fade-3">
            <button className="btn-hero">Explore Platform</button>
          </div>
        </div>

        {/* Animated blobs */}
        <div className="blob w-72 h-72 bg-purple-200 opacity-40 top-0 left-0 animate-blob"></div>
        <div className="blob w-72 h-72 bg-pink-200 opacity-40 bottom-0 right-0 animate-blob-2"></div>

      </section>

      {/* ================= STORY ================= */}
      <section className="section bg-section-a">
        <div className="section-inner grid md:grid-cols-2 gap-10 items-center">

          <div className="anim-fade-1">
            <h2 className="section-title">Our Story</h2>
            <p className="text-gray-600 mt-3">
              Our journey started with a simple goal — to make campus event
              management easier and more efficient. From registrations to
              feedback, everything is designed to be seamless.
            </p>

            <p className="text-gray-600 mt-3">
              Today, we are building a platform that connects students,
              organizers, and opportunities in one place.
            </p>
          </div>

          <div className="card-glass p-6 anim-fade-2 hover:scale-105 transition-all duration-300">
            <h3 className="font-bold text-lg mb-2">Our Mission 🚀</h3>
            <p className="text-gray-600 text-sm">
              To create a smart ecosystem where students can easily discover,
              register, and engage in events with a smooth digital experience.
            </p>
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section bg-section-b">
        <div className="section-inner text-center">

          <h2 className="section-title anim-fade-0">What We Offer</h2>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {[
              { icon: "🎯", title: "Event Management", desc: "Manage events easily" },
              { icon: "📊", title: "Analytics", desc: "Track engagement" },
              { icon: "⚡", title: "Fast & Secure", desc: "Modern & reliable" }
            ].map((item, i) => (
              <div
                key={i}
                className="card p-6 anim-fade-1 hover:scale-105 transition-all duration-300"
              >
                <div className="why-icon bg-purple-100 text-xl">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="section bg-soft">
        <div className="section-inner grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {[
            { num: "500+", label: "Students" },
            { num: "120+", label: "Events" },
            { num: "50+", label: "Organizers" },
            { num: "99%", label: "Satisfaction" }
          ].map((stat, i) => (
            <div key={i} className="stat-card anim-fade-1">
              <h3 className="stat-num text-grad-primary">{stat.num}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="section bg-section-a">
        <div className="section-inner text-center">

          <h2 className="section-title anim-fade-0">Meet the Team</h2>

          <div className="grid md:grid-cols-4 gap-6 mt-10">

            {team.map((member, i) => (
              <div
                key={i}
                className="card p-6 text-center anim-fade-2 hover:scale-105 transition-all duration-300"
              >
                <div className="avatar bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 text-lg animate-float">
                  {member.name.charAt(0)}
                </div>

                <h3 className="font-bold">{member.name}</h3>

                <p className="text-gray-500 text-sm">
                  {member.role}
                </p>

                {/* Social Icons */}
                <div className="flex justify-center gap-3 mt-4">
                  <span className="cursor-pointer hover:scale-125 transition">🌐</span>
                  <span className="cursor-pointer hover:scale-125 transition">💼</span>
                  <span className="cursor-pointer hover:scale-125 transition">🐦</span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section bg-cta text-center">
        <div className="section-inner">

          <h2 className="section-title anim-fade-1">
            Ready to Explore Events?
          </h2>

          <p className="section-desc mb-6 anim-fade-2">
            Join our platform and never miss opportunities again.
          </p>

          <button className="btn-hero anim-fade-3">
            Get Started
          </button>

        </div>
      </section>

    </div>
  );
};

export default About;