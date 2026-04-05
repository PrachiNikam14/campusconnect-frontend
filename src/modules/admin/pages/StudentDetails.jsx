import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById, updateStudentStatus } from "../services/studentService";
import { useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    const data = await getStudentById(id);
    setStudent(data);
  };

  const handleAction = async (status) => {
    await updateStudentStatus(id, status);
    fetchStudent(); // refresh data
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div className="">
      
      {/* Profile Section */}
      <div className="flex items-center gap-6">
        <img
          src={student.profilePhoto}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-2xl font-bold">{student.userName}</h2>
          <p className="text-gray-600">{student.userEmail}</p>

          <p className="mt-2">
            <b>User Status:</b>{" "}
            <span
                className={` ${
                student.userEnabled ? "text-green-500 font-bold" : "text-red-500 font-bold"
                }`}
            >
                {student.userEnabled ? "Active" : "Blocked"}

            </span>
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <p><b>College:</b> {student.CollegeName}</p>
        <p><b>Department:</b> {student.department}</p>
        <p><b>Year:</b> {student.year}</p>
        <p><b>Roll No:</b> {student.rollNumber}</p>
        <p><b>Hobbies:</b> {student.hobbies}</p>
      </div>

      {/* Skills */}
      <div className="mt-4">
        <b>Skills:</b>
        <div className="flex gap-2 mt-2">
          {student.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="mt-4">
        <b>Bio:</b>
        <p className="text-gray-700">{student.bio}</p>
      </div>

      {/* Links */}
      <div className="mt-4">
        <b>Links:</b>
        <div className="flex gap-4 ">
          <a
            href={`https://${student.githubUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            GitHub
          </a>

          <a
            href={`https://${student.linkedinUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* ID Card */}
      <div>
        <h2 className="mt-4 font-bold">Identity Card:</h2>
        <a
          href={student.idCardUrl}
          target="_blank"
          className="text-blue-600"
        >
          View ID Card
        </a>
      </div>

      <p className="mt-4">
        <b>Verification Status:</b>{" "}
        <span
          className={`font-bold ${
            student.verificationStatus === "APPROVED"
              ? "text-green-500"
              : student.verificationStatus === "REJECTED"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {student.verificationStatus}
        </span>
      </p>

      {/* Action Buttons */}
      <div className="space-x-3 flex justify-between items-center mt-6 mx-10">
      <div className="flex gap-3">
        <button
          onClick={() => handleAction("APPROVED")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Approve
        </button>

        <button
          onClick={() => handleAction("REJECTED")}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reject
        </button>
      </div>
      <div>
       <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
        >
            Close
        </button>
      </div>
      </div>
    </div>
  );
};

export default StudentDetails;