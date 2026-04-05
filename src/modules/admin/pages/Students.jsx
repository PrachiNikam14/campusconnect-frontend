import { useEffect, useState } from "react";
import {
  getStudents,
  updateStudentStatus,
} from "../services/studentService";
import StatusBadge from "../components/StatusBadge";
import { useNavigate } from "react-router-dom";


const Students = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    const data = await getStudents(filter);
    setStudents(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [filter]);

  const handleStatusUpdate = async (id, status) => {
    await updateStudentStatus(id, status);
    fetchStudents();
  };

  return (
    <div className="section bg-soft min-h-screen">

      <div className="section-inner space-y-6">

        {/* Title */}
        <h2 className="section-title text-center">
          Student Verification
        </h2>

        {/* Filter */}
        <div className="flex gap-3">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg border ${
              filter === s
                ? "bg-indigo-500 text-white"
                : "bg-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

        {/* Table Card */}
        <div className="overflow-x-auto border rounded-xl">

          <table className="w-full min-w-[700px] text-sm">

            <thead>
              <tr className="bg-soft text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Year</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-5">
                    Loading...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-5">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s, index) => (
                  <tr
                    key={s.id}
                    className="border-b border-[var(--color-border-soft)] hover:bg-soft anim-fade-0"
                  >
                    <td className="p-3 font-semibold">{s.userName}</td>
                    <td className="p-3 text-[var(--color-muted)]">
                      {s.userEmail}
                    </td>
                    <td className="p-3">{s.department}</td>
                    <td className="p-3">{s.year}</td>

                    {/* Status Badge */}
                    <td className="p-3">
                      <StatusBadge status={s.verificationStatus} />
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-center space-x-2">
                      <button
                      onClick={() => navigate(`/admin/students/${s.id}`)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(s.id, "APPROVED")
                      }
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(s.id, "REJECTED")
                      }
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                    >
                      Reject
                    </button>

                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Students;