// import React, { useEffect, useState } from "react";
// import API from "../../../api/axios";

// const MyFeedback = () => {
//   const [feedbacks, setFeedbacks] = useState([]);

//   const fetchFeedbacks = async () => {
//     try {
//       const res = await API.get("/student/feedback");

//       // ✅ Only show submitted feedback
//       const submitted = res.data.filter(f => f.isSubmitted);

//       setFeedbacks(submitted);

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//    await fetchFeedbacks();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">My Feedback</h1>

//       {feedbacks.length === 0 ? (
//         <p>No feedback submitted</p>
//       ) : (
//         feedbacks.map((f) => (
//           <div key={f.eventId} className="border p-4 mb-4 rounded shadow">
//             <h2 className="font-semibold">{f.eventTitle}</h2>
//             <p>⭐ Rating: {f.rating}</p>
//             <p>💬 {f.message}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyFeedback;