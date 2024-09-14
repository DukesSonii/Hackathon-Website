import React, { useState } from "react";

const CreateClass = ({ onAddClass }) => {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleCreateClass = (e) => {
    e.preventDefault();

    const newClass = {
      subject,
      date,
      time,
    };

    onAddClass(newClass);

    setSubject("");
    setDate("");
    setTime("");
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Create New Class</h2>
      <form onSubmit={handleCreateClass}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
