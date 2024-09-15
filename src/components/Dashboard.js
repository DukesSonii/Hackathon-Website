import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ClassCard from "./ClassCard";
import { useNavigate } from "react-router-dom";
import { useRole } from "../utils/RoleContext";

const Dashboard = () => {
  const { role, setRole } = useRole(); // Use role context
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const navigate = useNavigate();

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
        setEnrolledClasses(classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [role]);

  const handleEdit = (updatedClass) => {
    setEnrolledClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === updatedClass.id ? updatedClass : cls
      )
    );
  };

  const handleDelete = (deletedClass) => {
    setEnrolledClasses((prevClasses) =>
      prevClasses.filter((cls) => cls.id !== deletedClass.id)
    );
  };

  return (
    <div className="flex">
      <Sidebar role={role} onRoleChange={setRole} />
      <div className="flex-grow p-4">
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

export default Dashboard;
