import React, { useState, useEffect } from "react";
import { TbCamera, TbX } from "react-icons/tb";
import { createUser } from "../api/service"; // Import the API function
import toast from "react-hot-toast"; // Make sure you have this imported

const UserForm = ({
  closePopup,
  addUser,
  isEditing = false,
  userData = null,
}) => {
  const [formData, setFormData] = useState({
    name: "", // Changed from fullName to match your API
    email: "",
    phone: "",
    department: "",
    designation: "",
    description: "",
    profileImage: "",
    password: "", // Default password that can be changed later
    role: "", // Default user type
    status: "", // Default status
    permission: [], // Permissions array
    postModule: [], // Post modules array
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Populate form when editing existing user
  useEffect(() => {
    if (isEditing && userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        department: userData.department || "",
        designation: userData.designation || "",
        description: userData.description || "",
        profileImage: userData.profileImage || "",
        // Don't pre-populate password for security reasons
        role: userData.role || userData.userType || "",
        status: userData.status || "",
        permission: userData.permission || [],
        postModule: userData.postModule || [],
      });
    }
  }, [isEditing, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the actual file for upload
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const userFormData = { ...formData };

      // If there's an image file, handle it
      if (imageFile) {
        // In a real implementation, you'd upload the image to a server
        // and get a URL back to store in userData.profileImage
        // For now, we'll just keep the URL as is
      }

      // If editing, don't send password if it's empty
      if (isEditing && !userFormData.password) {
        delete userFormData.password;
      }

      // Call the parent's addUser function (which will call either createUser or updateUserById)
      await addUser(userFormData);

      // Close popup will be handled by parent component after successful operation
    } catch (error) {
      const actionType = isEditing ? "updating" : "creating";
      toast.error(`Error ${actionType} user`);
      console.error(`Error ${actionType} user:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditing ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={closePopup}
            className="text-gray-500 hover:text-gray-700"
          >
            <TbX size={24} />
          </button>
        </div>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center">
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200"></div>
            )}
            <label className="absolute bottom-0 right-0 bg-white border p-1 rounded-full cursor-pointer">
              <TbCamera />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Full Name *</span>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Email *</span>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">
              {isEditing
                ? "Password (leave blank to keep current)"
                : "Password *"}
            </span>
            <input
              type="password"
              name="password"
              placeholder={
                isEditing
                  ? "Enter new password or leave blank"
                  : "Enter password"
              }
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required={!isEditing}
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Department *</span>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Designation *</span>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Designation</option>
              <option value="Manager">Manager</option>
              <option value="Senior Executive">Senior Executive</option>
              <option value="Junior Executive">Junior Executive</option>
              <option value="Intern">Intern</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">User Type *</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select User Type</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Status</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={closePopup}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              disabled={isSubmitting}
            >
              <TbX className="inline-block mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                ? "Update"
                : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
