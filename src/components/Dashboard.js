import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ClassCard from "./ClassCard";
import Header from "./Header";

const App = () => {
  const [role, setRole] = useState("user");
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/sidebar/${role}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const classes =
          data.find((item) => item.name === "Enrolled Classes")?.classes || [];

        // Add a new class after fetching the existing ones
        const newClass = {
          id: classes.length + 1, // Assuming each class has a unique id
          subject: "New Class Subject",
          date: "2024-09-15",
          time: "10:00 AM",
        };

        setEnrolledClasses([...classes, newClass]); // Add the new class below the existing ones
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [role]);

  // Function to handle class edit
  const handleEdit = (updatedClass) => {
    setEnrolledClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === updatedClass.id ? updatedClass : cls
      )
    );
  };

  // Function to handle class deletion
  const handleDelete = (deletedClass) => {
    setEnrolledClasses((prevClasses) =>
      prevClasses.filter((cls) => cls.id !== deletedClass.id)
    );
  };

  return (
    <div className="flex">
      <Header />
      <Sidebar role={role} onRoleChange={setRole} />
      <div className="flex-grow p-4 mt-20">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the {role === "admin" ? "Admin" : "User"} Dashboard
        </h1>
        <ClassCard
          classes={enrolledClasses}
          isAdmin={role === "admin"}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
