import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ClassDetail = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch lectures and comments based on class ID
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/class/${id}`);
        const data = await response.json();
        setLectures(data.lectures);
        setComments(data.comments);
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

  return (
    <div>
      <h2>Class Lectures</h2>
      <ul>
        {lectures.map((lecture) => (
          <li key={lecture.id}>{lecture.title}</li>
        ))}
      </ul>

      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>

      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
        className="border p-2 w-full"
      />
      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Submit Comment
      </button>
    </div>
  );
};

export default ClassDetail;
