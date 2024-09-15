import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRole } from "../utils/RoleContext";
const ClassDetail = () => {
  const { id } = useParams();
  const { role } = useRole(); // Use role context
  const [lectures, setLectures] = useState([]);
  const [comments, setComments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    dueDate: "",
    completedDate: "",
  });

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/class/${id}`);
        const data = await response.json();
        setLectures(data.lectures);
        setComments(data.comments);
        setAssignments(data.assignments);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/class/${id}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newComment }),
        }
      );

      if (response.ok) {
        const newCommentData = await response.json();
        setComments((prev) => [...prev, newCommentData]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddAssignment = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/class/${id}/assignment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAssignment),
        }
      );

      if (response.ok) {
        const newAssignmentData = await response.json();
        setAssignments((prev) => [...prev, newAssignmentData]);
        setNewAssignment({ title: "", dueDate: "", completedDate: "" });
      }
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Class Lectures</h2>
      <ul className="mb-6">
        {lectures?.map((lecture) => (
          <li key={lecture.id} className="p-2 bg-white rounded shadow mb-2">
            {lecture.title}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      {role === "admin" && (
        <div className="mb-6">
          <input
            type="text"
            value={newAssignment.title}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, title: e.target.value })
            }
            placeholder="Assignment Title"
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="date"
            value={newAssignment.dueDate}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, dueDate: e.target.value })
            }
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="date"
            value={newAssignment.completedDate || ""}
            onChange={(e) =>
              setNewAssignment({
                ...newAssignment,
                completedDate: e.target.value,
              })
            }
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleAddAssignment}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add Assignment
          </button>
        </div>
      )}
      <ul>
        {assignments?.map((assignment) => (
          <li key={assignment.id} className="p-2 bg-white rounded shadow mb-2">
            {assignment.title}
            {assignment.dueDate && (
              <div>
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </div>
            )}
            {assignment.completedDate && (
              <div>
                Completed:{" "}
                {new Date(assignment.completedDate).toLocaleDateString()}
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4 mt-6">Comments</h2>
      {role === "user" && (
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Comment
          </button>
        </div>
      )}
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id} className="p-2 bg-white rounded shadow mb-2">
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassDetail;
