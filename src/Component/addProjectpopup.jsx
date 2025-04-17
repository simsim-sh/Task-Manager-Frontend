import React, { useState, useEffect } from "react";
import { createProject, updateProjectById } from "../api/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// Import icons from React Icons
import {
  FaTimes,
  FaBuilding,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSave,
} from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi"; // Heroicons outline
import { BiTask, BiCategory, BiNote } from "react-icons/bi";
import { MdDescription, MdAssignmentInd } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { RiCheckboxCircleLine } from "react-icons/ri";

// Add custom scrollbar styles
const scrollbarStyles = `
  /* Custom Scrollbar Styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #6366f1);
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #4f46e5);
  }

  /* Slide-in animation for the form */
  @keyframes slideInFromRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeInBackdrop {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .slide-in-from-right {
    animation: slideInFromRight 0.4s ease-out forwards;
  }

  .fade-in-backdrop {
    animation: fadeInBackdrop 0.3s ease-out forwards;
  }
`;

const AddProject = ({ closePopup, fetchData, selectedProject }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: selectedProject?.title || "",
    category: selectedProject?.category || "",
    description: selectedProject?.description || "",
    companyName: selectedProject?.companyName || "",
    contactPerson: selectedProject?.contactPerson || "",
    contactPhone: selectedProject?.contactPhone || "",
    contactEmail: selectedProject?.contactEmail || "",
    address: selectedProject?.address || "",
    assignedTo: selectedProject?.assignedTo || "",
    notes: selectedProject?.notes || "",
    status: selectedProject?.status || "Pending",
  });

  // Show/hide client details section
  const [clientSectionOpen, setClientSectionOpen] = useState(true);
  // State for animation
  const [isClosing, setIsClosing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = selectedProject?._id
        ? await updateProjectById(selectedProject._id, formData)
        : await createProject(formData);

      if (!res?.success) return toast.error(res?.message);
      toast.success(
        res?.message ||
          (selectedProject?._id ? "Project Updated" : "Project Created")
      );
      fetchData();
      closePopup();
    } catch (error) {
      toast.error(error.message || "Submission Failed");
    }
  };

  // Handle smooth closing of the form
  const handleClose = () => {
    setIsClosing(true);
    // Allow animation to complete before actually closing
    setTimeout(() => {
      closePopup();
    }, 300);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Fresh":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Hold":
        return "bg-gray-100 text-gray-800";
      case "Active":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Add ESC key listener to close the form
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      {/* Include the custom scrollbar and animation styles */}
      <style>{scrollbarStyles}</style>

      <div
        className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex z-50 ${
          isClosing ? "opacity-0" : "fade-in-backdrop"
        }`}
        style={{ transition: "opacity 0.3s ease-out" }}
      >
        {/* Click outside to close */}
        <div className="absolute inset-0" onClick={handleClose}></div>

        {/* Form container that slides in from right */}
        <div
          className={`ml-auto bg-white h-full w-full md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-2xl flex flex-col ${
            isClosing ? "transform translate-x-full" : "slide-in-from-right"
          }`}
          style={{ transition: "transform 0.3s ease-out" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with modern gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center">
              <BiTask size={20} className="mr-2" />
              {selectedProject?._id
                ? "Update Project Details"
                : "Create New Project"}
            </h2>
            <button
              onClick={handleClose}
              className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-1 transition-all duration-200"
            >
              <FaTimes size={16} />
            </button>
          </div>

          <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                    <BiTask className="text-orange-500 mr-1" size={16} />
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Enter project title"
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                    <BiCategory className="text-orange-500 mr-1" size={16} />
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200 bg-gray-50 hover:bg-white"
                    >
                      <option value="">Select Category</option>
                      <option value="development">Development</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <HiChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                  <MdDescription className="text-orange-500 mr-1" size={16} />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200 bg-gray-50 hover:bg-white custom-scrollbar"
                  placeholder="Brief description of the project"
                />
              </div>

              {/* Client Info - Collapsible section */}
              <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div
                  className="px-4 py-2.5 cursor-pointer flex justify-between items-center"
                  onClick={() => setClientSectionOpen(!clientSectionOpen)}
                >
                  <h3 className="text-sm font-semibold text-orange-800 flex items-center">
                    <FaBuilding className="mr-2 text-orange-500" />
                    Client Details
                  </h3>
                  <span
                    className={`text-orange-500 transform transition-transform duration-300 ${
                      clientSectionOpen ? "rotate-180" : ""
                    }`}
                  >
                    <HiChevronDown className="h-4 w-4 text-gray-400" />
                  </span>
                </div>

                {clientSectionOpen && (
                  <div className="p-4 space-y-3 bg-opacity-30 animate-slideDown">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaBuilding className="text-gray-400" size={14} />
                          </div>
                          <input
                            name="companyName"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" size={14} />
                          </div>
                          <input
                            name="contactPerson"
                            placeholder="Contact Person"
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" size={14} />
                          </div>
                          <input
                            name="contactPhone"
                            placeholder="Contact Phone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" size={14} />
                          </div>
                          <input
                            type="email"
                            name="contactEmail"
                            placeholder="Contact Email"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaMapMarkerAlt className="text-gray-400" size={14} />
                        </div>
                        <input
                          name="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Assignment and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                    <AiOutlineTeam className="text-orange-500 mr-1" size={16} />
                    Assigned To
                  </label>
                  <div className="relative">
                    <select
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleInputChange}
                      className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200 bg-gray-50 hover:bg-white"
                    >
                      <option value="">Select Team</option>
                      <option value="Dev Team">Dev Team</option>
                      <option value="Design Team">Design Team</option>
                      <option value="Marketing Team">Marketing Team</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <HiChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                    <RiCheckboxCircleLine
                      className="text-orange-500 mr-1"
                      size={16}
                    />
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={`w-full appearance-none px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200 ${getStatusColor(
                        formData.status
                      )}`}
                    >
                      <option value="">Select an option</option>
                      <option value="fresh">fresh</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">Hold</option>
                      <option value="Cancelled">Active</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <HiChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes (Optional) */}
              <div className="relative">
                <label className="flex items-center text-xs font-medium text-gray-600 mb-1">
                  <BiNote className="text-orange-500 mr-1" size={16} />
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200 bg-gray-50 hover:bg-white custom-scrollbar"
                  placeholder="Additional notes or comments"
                />
              </div>
            </form>
          </div>

          {/* Footer with action buttons */}
          <div className="bg-gray-50 px-5 py-4 flex justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100 transition-colors flex items-center"
            >
              <FaTimes className="mr-1" size={12} />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md text-sm hover:from-blue-600 hover:to-indigo-700 transition-colors shadow-sm flex items-center"
            >
              <FaSave className="mr-2" size={14} />
              {selectedProject?._id ? "Update Project" : "Save Project"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Animation keyframes are now included in the scrollbarStyles

export default AddProject;
