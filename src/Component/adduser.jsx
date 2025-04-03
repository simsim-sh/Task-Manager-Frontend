import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AddUserForm from "./adduserform";
import { MdPerson4, MdAutoDelete } from "react-icons/md";
import { LiaUserEditSolid } from "react-icons/lia";

const UserManagementPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Function to open the popup
  const openPopup = () => {
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Simran ",
      email: "simran@gmail.com",
      role: "Admin",
      post: "CEO",
      permissions: ["Edit", "View"],
      module: "API-Documentation",
      status: "Active",
    },
    {
      id: 2,
      name: "Tanu",
      email: "tanu@gmail.com",
      role: "User",
      post: "CEO",
      permissions: ["Add", "Edit"],
      module: "App-documentation",
      status: "Active",
    },
    {
      id: 3,
      name: "anshu",
      email: "anshu@gmail.com",
      role: "User",
      post: "CEO",
      permissions: ["Add", "Edit"],
      module: "App",
      status: "Active",
    },
  ]);

  // Function to handle user deletion
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* User Table */}
          <div className="bg-white rounded shadow overflow-hidden p-4">
            {/* Add User Button */}
            <div className="mb-4">
              <button
                className="bg-blue-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                onClick={openPopup} // Opens the popup
              >
                <MdPerson4 className="inline-block mr-2" />
                Add New User
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-8 bg-blue-800 text-white font-semibold">
              <div className="p-4">Name</div>
              <div className="p-4">Email</div>
              <div className="p-4">Role</div>
              <div className="p-4">Post</div>
              <div className="p-4">Permissions</div>
              <div className="p-4">Module</div>
              <div className="p-4">Status</div>
              <div className="p-4">Actions</div>
            </div>

            {/* Table Body */}
            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-8 border-b text-gray-700"
              >
                <div className="p-4">{user.name}</div>
                <div className="p-4">{user.email}</div>
                <div className="p-4">{user.role}</div>
                <div className="p-4">{user.post}</div>
                <div className="p-4">{user.permissions.join(", ")}</div>
                <div className="p-4">{user.module}</div>
                <div className="p-4">{user.status}</div>
                <div className="p-4 flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700  text-xl pr-6"
                    onClick={() => alert("Edit user")}
                  >
                    <LiaUserEditSolid />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-xl"
                    onClick={() => handleDelete(user.id)}
                  >
                    <MdAutoDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && <AddUserForm closePopup={closePopup} />}
    </div>
  );
};

export default UserManagementPage;
