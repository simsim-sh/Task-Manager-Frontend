import React, { useEffect, useState } from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import AddUserForm from "../Component/adduserform";
import { MdPersonAdd, MdDelete } from "react-icons/md";
import { LiaUserEditSolid } from "react-icons/lia";
import girlpicture from "../assets/images/girlpicture.png";
import toast from "react-hot-toast";
import { getAllUsers } from "../api/service";
import Profile from "../assets/images/girlpicture.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../component/ui/table";

const UserManagementPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState();

  //api integration
  const fetchData = async () => {
    try {
      const getAllUsersResponse = await getAllUsers();
      if (getAllUsersResponse?.success) {
        return toast.message(getAllUsersResponse?.message);
      }
      setAllUsers(getAllUsersResponse?.data);
      // console.log("getAllUsersResponse", getAllUsersResponse?.data);
    } catch (error) {
      toast.error("Error fetching users.");
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 w-full mb-4 bg-gray-100 min-h-screen">
          <button
            className="bg-blue-600  rounded shadow p-4 hover:bg-blue-800 text-white font-bold py-2 px-4 "
            onClick={openPopup}
          >
            <MdPersonAdd className="inline-block mr-2" /> Add Team Member
          </button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Profile</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Department</TableHead>
                <TableHead className="text-center">Designation</TableHead>
                <TableHead className="text-center">Assigned Project</TableHead>
                <TableHead className="text-center">Permission</TableHead>
                <TableHead className="text-center">Post Module</TableHead>
                <TableHead className="text-center">User Type</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell>
                    <img
                      src={row.profileImage || Profile}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.department || "N/A"}</TableCell>
                  <TableCell>{row.designation || "N/A"}</TableCell>
                  <TableCell>{row.project || "N/A"}</TableCell>
                  <TableCell>{row.permission?.join(", ") || "None"}</TableCell>
                  <TableCell>{row.postModule?.join(", ") || "None"}</TableCell>
                  <TableCell>{row.userType || "N/A"}</TableCell>
                  <TableCell
                    className={`p-4 font-bold ${
                      row.status?.toLowerCase() === "active"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {row.status || "Inactive"}
                  </TableCell>
                  <TableCell className=" flex gap-2 text-xl">
                    <LiaUserEditSolid
                      onClick={() => alert("Edit User details")}
                      className="hover:text-blue-700  text-blue-500"
                    />
                    <MdDelete
                      onClick={() => handleDelete(row._id)}
                      className="text-red-500 hover:text-red-700"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {showPopup && <AddUserForm closePopup={closePopup} addUser={addUser} />}
    </div>
  );
};

export default UserManagementPage;
