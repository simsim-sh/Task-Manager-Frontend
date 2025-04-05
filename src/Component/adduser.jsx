import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AddUserForm from "./adduserform";
import { MdPersonAdd, MdDelete } from "react-icons/md";
import { LiaUserEditSolid } from "react-icons/lia";
import girlpicture from "../assets/girlpicture.png";

const UserManagementPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Simran",
      email: "simran@gmail.com",
      Department: "Admin",
      Designation: "Project Manager",
      project: "CRM Dashboard",
      status: "Active",
      profileImage: girlpicture,
    },
    {
      id: 2,
      name: "Tanu",
      email: "tanu@gmail.com",
      Department: "Team Member",
      Designation: "Frontend Developer",
      project: "E-Commerce Platform",
      status: "Pending",
      profileImage: girlpicture,
    },
    {
      id: 3,
      name: "Anshu",
      email: "anshu@gmail.com",
      Department: "Intern",
      Designation: "Backend Developer",
      project: "Mobile App",
      status: "Invited",
      profileImage: girlpicture,
    },
  ]);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const addUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="bg-white rounded shadow p-4">
            <div className="mb-4">
              <button
                className="bg-blue-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                onClick={openPopup}
              >
                <MdPersonAdd className="inline-block mr-2" /> Add Team Member
              </button>
            </div>
            <div className="grid grid-cols-8 bg-blue-800 text-white font-semibold">
              <div className="p-4">Profile</div>
              <div className="p-4">Name</div>
              <div className="p-4">Email</div>
              <div className="p-4">Department</div>
              <div className="p-4"> Designation</div>
              <div className="p-4">Assigned Project</div>
              <div className="p-4">Status</div>
              <div className="p-4">Actions</div>
            </div>
            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-8 border-b text-gray-700 items-center"
              >
                <div className="p-4 flex justify-center">
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="p-4">{user.name}</div>
                <div className="p-4">{user.email}</div>
                <div className="p-4 ps-12">{user.Department}</div>
                <div className="p-4">{user.Designation}</div>
                <div className="p-4">{user.project}</div>
                <div
                  className={`p-4 font-bold ${
                    user.status === "Active"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {user.status}
                </div>
                <div className="p-4 flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 text-xl pr-6"
                    onClick={() => alert("Edit user details")}
                  >
                    <LiaUserEditSolid />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-xl"
                    onClick={() => handleDelete(user.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && <AddUserForm closePopup={closePopup} addUser={addUser} />}
    </div>
  );
};

export default UserManagementPage;
