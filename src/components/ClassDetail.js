import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRole } from "../utils/RoleContext";

const ClassDetail = () => {
  const { id } = useParams();
  const { role } = useRole(); // Use role context
  const [lectures, setLectures] = useState([]);
  const [comments, setComments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    dueDate: "",
    completedDate: "",
  });
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    description: "",
    image: null,
    parentId: null,
  });

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/class/${id}`);
        const data = await response.json();
        setLectures(data.lectures);
        setComments(data.comments);
        setAssignments(data.assignments);
        setDiscussions(data.discussions);
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

  // const handleAddDiscussion = async () => {
  //   const formData = new FormData();
  //   formData.append("title", newDiscussion.title);
  //   formData.append("description", newDiscussion.description);
  //   if (newDiscussion.image) {
  //     formData.append("image", newDiscussion.image);
  //   }
  //   formData.append("parentId", newDiscussion.parentId || "");

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/class/${id}/discussion`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       const newDiscussionData = await response.json();
  //       setDiscussions((prev) => [...prev, newDiscussionData]);
  //       setNewDiscussion({
  //         title: "",
  //         description: "",
  //         image: null,
  //         parentId: null,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error adding discussion:", error);
  //   }
  // };

  const handleImageChange = (e) => {
    setNewDiscussion({ ...newDiscussion, image: e.target.files[0] });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-semibold mb-6 text-gray-800">
        Class Lectures
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lectures?.map((lecture) => (
          <div
            key={lecture.id}
            className="p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900">
              {lecture.title}
            </h3>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mt-10 mb-4 text-gray-800">
        Assignments
      </h2>
      {role === "admin" && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
          <input
            type="text"
            value={newAssignment.title}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, title: e.target.value })
            }
            placeholder="Assignment Title"
            className="border border-gray-300 p-3 rounded-lg w-full mb-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <input
            type="date"
            value={newAssignment.dueDate}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, dueDate: e.target.value })
            }
            className="border border-gray-300 p-3 rounded-lg w-full mb-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
            className="border border-gray-300 p-3 rounded-lg w-full mb-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            onClick={handleAddAssignment}
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
          >
            Add Assignment
          </button>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignments?.map((assignment) => (
          <div
            key={assignment.id}
            className="p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900">
              {assignment.title}
            </h3>
            {assignment.dueDate && (
              <div className="text-sm text-gray-600">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </div>
            )}
            {assignment.completedDate && (
              <div className="text-sm text-gray-600">
                Completed:{" "}
                {new Date(assignment.completedDate).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mt-10 mb-4 text-gray-800">
        Comments
      </h2>
      {role === "user" && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="border border-gray-300 p-3 rounded-lg w-full mb-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            onClick={handleAddComment}
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
          >
            Add Comment
          </button>
        </div>
      )}
      <div className="grid gap-6">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow"
          >
            <p className="text-gray-900">{comment.text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mt-10 mb-4 text-gray-800">
        Discussions
      </h2>
      {role === "user" && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
          <input
            type="text"
            value={newDiscussion.title}
            onChange={(e) =>
              setNewDiscussion({ ...newDiscussion, title: e.target.value })
            }
            placeholder="Discussion Title"
            className="border border-gray-300 p-3 rounded-lg w-full mb-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <textarea
            value={newDiscussion.description}
            onChange={(e) =>
              setNewDiscussion({
                ...newDiscussion,
                description: e.target.value,
              })
            }
            placeholder="Discussion Description"
            className="border border-gray-300 p-3 rounded-lg w-full mb-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="border border-gray-300 p-3 rounded-lg w-full mb-2"
          />
          <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition">
            Add Discussion
          </button>
        </div>
      )}
      <div className="grid gap-6">
        {discussions?.map((discussion) => (
          <div
            key={discussion.id}
            className="p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900">
              {discussion.title}
            </h3>
            <p className="text-gray-700">{discussion.description}</p>
            {discussion.image && (
              <img
                src={discussion.image}
                alt="Discussion"
                className="w-full h-48 object-cover mt-4 rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassDetail;
