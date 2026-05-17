import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import { toast } from "react-toastify";

function Users() {

  const [users, setUsers] = useState([]);

  // Fetch Users
  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://car-management-application-3wos.onrender.com/api/users/users/${id}",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {

        toast.error(data.message);

      } else {

        setUsers(data);

      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    }

  };

  // Delete User
  const deleteUser = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://car-management-application-3wos.onrender.com/api/users/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {

        toast.error(data.message);

      } else {

        toast.success("User deleted successfully");

        fetchUsers();

      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <Layout>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">

            Users Management 👥

          </h1>

          <p className="text-gray-500 mt-2">

            Manage all platform users

          </p>

        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100 dark:bg-gray-800">

              <tr>

                <th className="p-5 text-left dark:text-white">

                  Name

                </th>

                <th className="p-5 text-left dark:text-white">

                  Email

                </th>

                <th className="p-5 text-left dark:text-white">

                  Role

                </th>

                <th className="p-5 text-left dark:text-white">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >

                  {/* Name */}
                  <td className="p-5 dark:text-white">

                    {user.name}

                  </td>

                  {/* Email */}
                  <td className="p-5 dark:text-gray-300">

                    {user.email}

                  </td>

                  {/* Role */}
                  <td className="p-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        user.isAdmin
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >

                      {
                        user.isAdmin
                          ? "Admin 👑"
                          : "User"
                      }

                    </span>

                  </td>

                  {/* Actions */}
                  <td className="p-5">

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>

  );

}

export default Users;