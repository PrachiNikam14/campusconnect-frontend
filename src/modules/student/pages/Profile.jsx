// import { useEffect, useState } from "react";
// import { getProfile } from "../services/studentService";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getProfile().then(res => {
//       setProfile(res.data);
//     console.log(res.data);
//     });
//   }, []);

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-hero">
//         <div className="card-glass px-6 py-4">
//           <p className="text-sm font-medium text-gray-600 animate-pulse">
//             Loading your profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-hero relative overflow-hidden px-5 py-6">

//       {/* Background Blobs */}
//       <div className="blob w-72 h-72 bg-purple-300 opacity-20 top-[-50px] left-[-50px] animate-blob"></div>
//       <div className="blob w-72 h-72 bg-pink-300 opacity-20 bottom-[-50px] right-[-50px] animate-blob-2"></div>

//       <div className="w-full max-w-5xl mx-auto">

//         <div className="card-glass p-4 md:p-8 flex flex-col md:flex-row gap-6 items-center anim-fade-1">

//           {/* LEFT SIDE */}
//           <div className="flex flex-col items-center text-center md:w-1/3">

//             <div className="relative">
//               <img
//                 src={profile.profilePhoto}
//                 alt="Profile"
//                 className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
//               />
//               <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse-dot"></span>
//             </div>

//             <h2 className="mt-3 text-xl font-extrabold text-grad-primary">
//               {profile.userName}
//             </h2>

//             <p className="text-xs text-gray-500">{profile.userEmail}</p>

//             {/* Buttons */}
//             <div className="mt-4 flex gap-2">
//               <button
//                 className="btn-primary text-xs px-4 py-2"
//                 onClick={() => navigate("/student/update-profile")}
//               >
//                 Edit
//               </button>

//               <button className="btn-outline text-xs px-4 py-2">
//                 Logout
//               </button>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex-1 w-full">

//             <h3 className="text-base font-semibold mb-3 text-gray-700">
//               Profile Details
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

//               <div className="card p-3">
//                 <p className="text-xs text-gray-400">College</p>
//                 <p className="font-semibold text-sm">{profile.collegeName}</p>
//               </div>

//               <div className="card p-3">
//                 <p className="text-xs text-gray-400">Department</p>
//                 <p className="font-semibold text-sm">{profile.department}</p>
//               </div>

//               <div className="card p-3">
//                 <p className="text-xs text-gray-400">Year</p>
//                 <p className="font-semibold text-sm">{profile.year}</p>
//               </div>

//               <div className="card p-3">
//                 <p className="text-xs text-gray-400">Status</p>
//                 <p className="font-semibold text-green-500 text-sm">Active</p>
//               </div>

//             </div>

//             {/* Bio */}
//             {profile.bio && (
//               <div className="mt-4 card p-4">
//                 <p className="text-xs text-gray-400 mb-1">About</p>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   {profile.bio}
//                 </p>
//               </div>
//             )}

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getProfile } from "../services/studentService";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res.data);
      console.log(res.data);
    });
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero">
        <div className="card-glass px-6 py-4">
          <p className="text-sm font-medium text-gray-600 animate-pulse">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero relative overflow-hidden px-5 py-6">

      {/* Background Blobs */}
      <div className="blob w-72 h-72 bg-purple-300 opacity-20 top-[-50px] left-[-50px] animate-blob"></div>
      <div className="blob w-72 h-72 bg-pink-300 opacity-20 bottom-[-50px] right-[-50px] animate-blob-2"></div>

      <div className="w-full max-w-5xl mx-auto">

        <div className="card-glass p-4 md:p-8 flex flex-col md:flex-row gap-6 items-center anim-fade-1">

          {/* LEFT SIDE */}
          <div className="flex flex-col items-center text-center md:w-1/3">

            <div className="relative">
              <img
                src={profile.profilePhoto}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse-dot"></span>
            </div>

            <h2 className="mt-3 text-xl font-extrabold text-grad-primary">
              {profile.userName}
            </h2>

            <p className="text-xs text-gray-500">{profile.userEmail}</p>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                className="btn-primary text-xs px-4 py-2"
                onClick={() => navigate("/student/update-profile")}
              >
                Edit
              </button>

              <button className="btn-outline text-xs px-4 py-2">
                Logout
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 w-full">

            <h3 className="text-base font-semibold mb-3 text-gray-700">
              Profile Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div className="card p-3">
                <p className="text-xs text-gray-400">College</p>
                <p className="font-semibold text-sm">{profile.collegeName}</p>
              </div>

              <div className="card p-3">
                <p className="text-xs text-gray-400">Department</p>
                <p className="font-semibold text-sm">{profile.department}</p>
              </div>

              <div className="card p-3">
                <p className="text-xs text-gray-400">Year</p>
                <p className="font-semibold text-sm">{profile.year}</p>
              </div>

              <div className="card p-3">
                <p className="text-xs text-gray-400">Roll Number</p>
                <p className="font-semibold text-sm">{profile.rollNumber}</p>
              </div>

              <div className="card p-3">
                <p className="text-xs text-gray-400">Hobbies</p>
                <p className="font-semibold text-sm">{profile.hobbies}</p>
              </div>

              <div className="card p-3">
                <p className="text-xs text-gray-400">Status</p>
                <p className="font-semibold text-sm text-purple-600">
                  {profile.verificationStatus}
                </p>
              </div>

            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="mt-4 card p-4">
                <p className="text-xs text-gray-400 mb-1">About</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="mt-4 card p-4">
                <p className="text-xs text-gray-400 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="badge bg-purple-100 text-purple-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(profile.linkedinUrl || profile.githubUrl) && (
              <div className="mt-4 card p-4">
                <p className="text-xs text-gray-400 mb-2">Links</p>

                {profile.linkedinUrl && (
                  <a
                    href={
                      profile.linkedinUrl.startsWith("http")
                        ? profile.linkedinUrl
                        : `https://${profile.linkedinUrl}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-blue-500 underline"
                  >
                    LinkedIn
                  </a>
                )}

                {profile.githubUrl && (
                  <a
                    href={
                      profile.githubUrl.startsWith("http")
                        ? profile.githubUrl
                        : `https://${profile.githubUrl}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-gray-700 underline"
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}

            {/* ID Card */}
            {profile.idCardUrl && (
              <div className="mt-4 card p-4">
                <p className="text-xs text-gray-400 mb-2">ID Card</p>
                <img
                  src={profile.idCardUrl}
                  alt="ID Card"
                  className="w-full max-w-xs rounded-lg border cursor-pointer hover:scale-105 transition"
                  onClick={() => window.open(profile.idCardUrl, "_blank")}
                />
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}