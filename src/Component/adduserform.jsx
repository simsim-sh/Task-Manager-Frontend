import React, { useState } from "react";
import { TbCancel } from "react-icons/tb";
import { IoIosPersonAdd } from "react-icons/io";

const AddUserForm = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    post: "",
    permissions: [],
    module: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Added:", formData);
    closePopup(); // Close the popup after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
      <div className="bg-white p-6  rounded-2xl shadow-lg w-[500px] transform scale-100 transition-all duration-300">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          <IoIosPersonAdd className="inline-block mr-2" /> Add New User
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <label className="block">
            <span className="text-gray-700 font-medium">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              required
            />
          </label>

          {/* Email Field */}
          <label className="block">
            <span className="text-gray-700 font-medium">Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              required
            />
          </label>

          {/* Role Dropdown */}
          <label className="block">
            <span className="text-gray-700 font-medium">Role:</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </label>

          {/* Post Field */}
          <label className="block">
            <span className="text-gray-700 font-medium">Post:</span>
            <input
              type="text"
              name="post"
              value={formData.post}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </label>

          {/* Module Field */}
          <label className="block">
            <span className="text-gray-700 font-medium">Module:</span>
            <input
              type="text"
              name="module"
              value={formData.module}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </label>

          {/* Status Dropdown */}
          <label className="block">
            <span className="text-gray-700 font-medium">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={closePopup}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              <TbCancel className="inline-block mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition duration-300"
            >
              <IoIosPersonAdd className="inline-block mr-2" />
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
