import React, { useEffect, useState } from "react";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons"; // Import relevant icons
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Sidebar = ({ role, onRoleChange }) => {
  const navigate = useNavigate();
  const isMenuopen = useSelector((store) => store.app.isMenuopen); // Check if the state is coming from Redux

  const [sidebarData, setSidebarData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered sidebar data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showModal, setShowModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/sidebar/${role}`);
        const data = await response.json();
        setSidebarData(data);
        setFilteredData(data); // Initialize filteredData with the fetched data
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, [role]);

  useEffect(() => {
    if (searchQuery) {
      const results = sidebarData
        .map((item) => ({
          ...item,
          classes: item.classes?.filter((cls) =>
            cls.subject.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((item) => item.classes?.length > 0);
      setFilteredData(results);
    } else {
      setFilteredData(sidebarData);
    }
  }, [searchQuery, sidebarData]);

  const handleDropdownToggle = (itemId) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleClassClick = (id) => {
    navigate(`/home/class/${id}`);
  };

  return (
    isMenuopen && ( // Conditionally render Sidebar based on isMenuopen state
      <div className="flex flex-col w-64 bg-white text-gray-700 h-screen p-4 mt-5 shadow-lg">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border rounded-md bg-gray-100 focus:outline-none"
            />
          </div>
        </div>
        <ul className="space-y-2">
          {filteredData.map((item) => (
            <li key={item.id} className="mb-2">
              <div
                onClick={() => handleDropdownToggle(item.id)}
                className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                  activeDropdown === item.id ? "bg-gray-100" : ""
                }`}
              >
                <span className="text-lg flex-grow">{item.name}</span>
                {item.icon === "dashboard" && <DashboardOutlined />}
                {item.icon === "user" && <UserOutlined />}
                {item.icon === "settings" && <SettingOutlined />}
                {item.icon === "appstore" && <AppstoreOutlined />}
              </div>
              {item.classes && activeDropdown === item.id && (
                <ul className="ml-6 mt-2 space-y-1 bg-gray-50 rounded-lg shadow-lg p-3 transition-all duration-300 ease-in-out">
                  {item.classes.map((cls, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer p-2 rounded-md transition-colors duration-200"
                      onClick={() => handleClassClick(cls.id)}
                    >
                      {cls.subject} - {cls.section}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <button
          className="mt-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Switch Role
        </button>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-4 rounded shadow-lg w-64">
              <h3 className="text-lg font-semibold mb-2">Switch Role</h3>
              <button
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-2"
                onClick={() => {
                  onRoleChange("admin");
                  setShowModal(false);
                }}
              >
                Switch to Admin
              </button>
              <button
                className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                onClick={() => {
                  onRoleChange("user");
                  setShowModal(false);
                }}
              >
                Switch to User
              </button>
              <button
                className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-2"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Sidebar;
