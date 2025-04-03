import React, { useEffect, useState } from "react";
import { createProject, updateProjectById } from "../api/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const addProject = ({ closePopup, selectedProject }) => {
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

  const isReadOnly = selectedProject?._id ? true : false;

  // Handle Input Change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProject?._id) {
        // If project exists, update it
        const updateProjectResponse = await updateProjectById(
          selectedProject._id,
          formData
        );
        if (!updateProjectResponse?.success) {
          return toast.error(updateProjectResponse?.message);
        }
        toast.success(
          updateProjectResponse?.message || "Project Updated Successfully"
        );
      } else {
        // Create new project
        const createProjectResponse = await createProject(formData);
        if (!createProjectResponse?.success) {
          return toast.error(createProjectResponse?.message);
        }
        toast.success(
          createProjectResponse?.message || "Project Created Successfully"
        );
      }

      closePopup();
      navigate("/project");
    } catch (error) {
      toast.error(error.message || "Failed to Submit the Data");
    }
  };

  // Handle Checkbox Change for assigned team members
  //   const handleCheckboxChange = (field, person) => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [field]: {
  //         ...prev[field],
  //         [person]: !prev[field][person],
  //       },
  //     }));
  //   };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-lg shadow-xl  p-6">
        <div className="border-b px-6  flex justify-end items-center">
          <button
            onClick={closePopup}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        {/* FORM FIELDS */}
        <form onSubmit={handleSubmit} className="overflow-auto  space-y-4">
          <div className="p-2 rounded-lg mb-1">
            <h2 className="text-blue-600 text-2xl font-bold text-center">
              {selectedProject?._id ? "VIEW PROJECT" : "ADD NEW PROJECT"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-800">
                PROJECT TITLE
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                // readOnly={isReadOnly}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-800">
                PROJECT CATEGORY
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                // disabled={isReadOnly}
              >
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-800">
              PROJECT DESCRIPTION
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
              // readOnly={isReadOnly}
            ></textarea>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border">
            <label className="text-xs font-bold text-gray-800">
              CLIENT DETAILS
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="companyName"
                placeholder="COMPANY NAME"
                value={formData.companyName}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md"
                // readOnly={isReadOnly}
              />
              <input
                type="text"
                name="contactPerson"
                placeholder="CONTACT PERSON"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md"
                // readOnly={isReadOnly}
              />
              <input
                type="text"
                name="contactPhone"
                placeholder="CONTACT PHONE"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md"
                // readOnly={isReadOnly}
              />
              <input
                type="email"
                name="contactEmail"
                placeholder="CONTACT EMAIL"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-md"
                // readOnly={isReadOnly}
              />
              <input
                type="text"
                name="address"
                placeholder="ADDRESS"
                value={formData.address}
                onChange={handleInputChange}
                className="col-span-2 px-3 py-2 border rounded-md"
                // readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border">
            <label className="text-xs font-bold text-gray-800">
              ASSIGNED GROUP
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              // disabled={isReadOnly}
            >
              <option value="Dev Team">Dev Team</option>
              <option value="Design Team">Design Team</option>
              <option value="Marketing Team">Marketing Team</option>
            </select>
          </div>
          {/* <div>
            <label className="text-xs font-medium text-gray-800">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
              // readOnly={isReadOnly}
            ></textarea>
          </div> */}
          <div className="flex justify-end pt-2 gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              {selectedProject?._id ? "UPDATE PROJECT" : "SAVE PROJECT"}
            </button>
            <button
              type="button"
              onClick={closePopup}
              className="px-6 py-2 bg-gray-500 text-white rounded-md"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default addProject;
