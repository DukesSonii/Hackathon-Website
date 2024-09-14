import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ClassDetail = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [comments, setComments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    date: "",
    completionDate: "",
  });

  useEffect(() => {
    // Fetch class details
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

  // Handle adding a new comment
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

  // Handle adding a new assignment
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
        setNewAssignment({ title: "", date: "", completionDate: "" });
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

      {/* Assignment Section */}
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
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
          value={newAssignment.date}
          onChange={(e) =>
            setNewAssignment({ ...newAssignment, date: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="date"
          value={newAssignment.completionDate}
          onChange={(e) =>
            setNewAssignment({
              ...newAssignment,
              completionDate: e.target.value,
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

      <ul className="mb-6">
        {assignments.map((assignment) => (
          <li
            key={assignment.id}
            className="p-4 bg-white rounded shadow mb-4 border-l-4 border-green-500"
          >
            <p className="font-semibold text-xl">{assignment.title}</p>
            <p className="text-gray-600">Assigned on: {assignment.date}</p>
            <p className="text-gray-600">Due by: {assignment.completionDate}</p>
          </li>
        ))}
      </ul>

      {/* Comments Section */}
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="mb-6">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600"
        >
          Submit Comment
        </button>
      </div>

      <ul>
        {comments?.map((comment) => (
          <li
            key={comment.id}
            className="p-4 bg-white rounded shadow mb-4 border-l-4 border-blue-500"
          >
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassDetail;
