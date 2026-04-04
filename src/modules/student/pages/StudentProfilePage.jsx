// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function StudentProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(true);
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [idCardFile, setIdCardFile] = useState(null);
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     department: "",
//     year: "",
//     bio: "",
//     skills: "",
//     hobbies: "",
//     linkedinUrl: "",
//     githubUrl: "",
//     rollNumber: "",
//   });

//   const token = localStorage.getItem("token");
//   if (!token) return <div className="p-6 text-red-500">Please login first</div>;

//   // ---------------- FETCH PROFILE ----------------
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/student/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const data = res.data;

//         if (!data || Object.keys(data).length === 0) {
//           setProfile({});
//           setEditMode(true);
//           return;
//         }

//         setProfile(data);

//         setFormData({
//           name: data.userName || "",
//           department: data.department || "",
//           year: data.year || "",
//           bio: data.bio || "",
//           skills: Array.isArray(data.skills)
//             ? data.skills.join(", ")
//             : "",
//           hobbies: data.hobbies || "",
//           linkedinUrl: data.linkedinUrl || "",
//           githubUrl: data.githubUrl || "",
//           rollNumber: data.rollNumber || "",
//         });

//         setEditMode(!data.department || !data.year || !data.skills);
//       })
//       .catch((err) => {
//         if (err.response?.status === 404) {
//           setProfile({});
//           setEditMode(true);
//         } else {
//           setError("Failed to fetch profile");
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [token]);

//   // ---------------- INPUT HANDLING ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAvatarChange = (e) => {
//     setAvatarFile(e.target.files[0]);
//   };

//   const handleIdCardChange = (e) => {
//     setIdCardFile(e.target.files[0]);
//   };

//   // ---------------- SAVE PROFILE ----------------
//   const handleSave = async () => {
//     try {
//       setLoading(true);

//       const form = new FormData();

//       form.append("name", formData.name);
//       form.append("department", formData.department);

//       // year validation (1–4)
//       const year = Number(formData.year);
//       if (year >= 1 && year <= 4) {
//         form.append("year", year);
//       }

//       form.append("bio", formData.bio);
//       form.append("hobbies", formData.hobbies);
//       form.append("linkedinUrl", formData.linkedinUrl);
//       form.append("githubUrl", formData.githubUrl);
//       form.append("rollNumber", formData.rollNumber);

//       // skills
//       if (formData.skills) {
//         formData.skills.split(",").forEach((skill) => {
//           const trimmed = skill.trim();
//           if (trimmed) {
//             form.append("skills", trimmed);
//           }
//         });
//       }

//       // profile photo
//       if (avatarFile) {
//         form.append("profilePhoto", avatarFile);
//       }

//       // id card (IMPORTANT)
//       if (idCardFile) {
//         form.append("idCard", idCardFile);
//       }

//       const url = "http://localhost:8080/student/profile";

//       if (!profile || Object.keys(profile).length === 0) {
//         await axios.post(url, form, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       } else {
//         await axios.patch(url, form, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       }

//       alert("Profile saved successfully!");
//       setEditMode(false);

//       // Refresh profile
//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setProfile(res.data);

//     } catch (err) {
//       console.error("ERROR:", err.response?.data);
//       alert("Failed to save profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UI ----------------
//   if (loading)
//     return <div className="p-6 text-center text-gray-500">Loading...</div>;

//   if (error) return <div className="p-6 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen bg-hero py-8 px-4 sm:px-6 lg:px-12">
//       <div className="max-w-5xl mx-auto">

//         <div className="card-glass p-8 flex flex-col md:flex-row gap-8">

//           {/* Avatar */}
//           <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
//             <div className="relative">
//               <img
//                 src={profile?.profilePhoto || "/default-avatar.png"}
//                 alt="avatar"
//                 className="w-36 h-36 rounded-full object-cover border-4 shadow-lg"
//               />
//               {editMode && (
//                 <input
//                   type="file"
//                   onChange={handleAvatarChange}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                 />
//               )}
//             </div>

//             <h2 className="text-xl font-bold">{profile?.userName}</h2>
//             <p className="text-gray-600">{profile?.userEmail}</p>
//           </div>

//           {/* Form */}
//           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {Object.entries(formData).map(([key, value]) => (
//               <div key={key}>
//                 <label className="text-gray-500 text-sm">{key}</label>

//                 {editMode ? (
//                   <input
//                     type="text"
//                     name={key}
//                     value={value}
//                     onChange={handleChange}
//                     className="input"
//                   />
//                 ) : (
//                   <p>{value || "Not provided"}</p>
//                 )}
//               </div>
//             ))}

//             {/* ID CARD UPLOAD */}
//             {editMode && (
//               <div className="col-span-2">
//                 <label className="text-gray-500 text-sm">Upload ID Card</label>
//                 <input type="file" onChange={handleIdCardChange} />
//               </div>
//             )}

//             <div className="col-span-2 flex gap-4 mt-4">
//               {editMode ? (
//                 <>
//                   <button onClick={handleSave} className="btn-primary">
//                     Save
//                   </button>
//                   <button onClick={() => setEditMode(false)} className="btn-outline">
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button onClick={() => setEditMode(true)} className="btn-primary">
//                   Edit Profile
//                 </button>
//               )}
//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

const StudentProfilePage = ()=>{
  return (
    <p>hello student</p>
  )

}

  export default StudentProfilePage;
