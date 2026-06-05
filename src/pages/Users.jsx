import { useEffect, useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import api from "../services/api";

function Users() {

  const navigate =
    useNavigate();

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        const response =
          await api.get(
            "/admin/users",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUsers(
          response.data.users
        );

      } catch (error) {

        console.error(
          error
        );

      } finally {

        setLoading(false);

      }

    };

  const handleViewUser =
    (userId) => {

      navigate(
        `/users/${userId}`
      );

    };

  return (

    <AdminLayout>

      <div
        className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        "
      >

        <div
          className="
          flex
          items-center
          justify-between
          mb-6
          "
        >

          <h1
            className="
            text-2xl
            font-bold
            "
          >
            All Users
          </h1>

          <span
            className="
            bg-blue-100
            text-blue-700
            px-4
            py-2
            rounded-xl
            font-medium
            "
          >
            Total Users: {users.length}
          </span>

        </div>

        {
          loading ? (

            <p>
              Loading...
            </p>

          ) : (

            <div
              className="
              overflow-x-auto
              "
            >

              <table
                className="
                w-full
                "
              >

                <thead>

                  <tr
                    className="
                    border-b
                    text-gray-600
                    "
                  >

                    <th className="text-left py-4">
                      Name
                    </th>

                    <th className="text-left py-4">
                      Email
                    </th>

                    <th className="text-left py-4">
                      Role
                    </th>

                    <th className="text-left py-4">
                      Created
                    </th>

                    <th className="text-left py-4">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    users.map(
                      (user) => (

                        <tr
                          key={user._id}
                          className="
                          border-b
                          hover:bg-slate-50
                          "
                        >

                          <td
                            className="
                            py-4
                            font-medium
                            "
                          >
                            {
                              user.name
                            }
                          </td>

                          <td>
                            {
                              user.email
                            }
                          </td>

                          <td>

                            <span
                              className={
                                user.role ===
                                "ADMIN"

                                  ? "text-red-500 font-semibold"

                                  : "text-green-600 font-semibold"
                              }
                            >
                              {
                                user.role
                              }
                            </span>

                          </td>

                          <td>

                            {
                              new Date(
                                user.createdAt
                              ).toLocaleDateString()
                            }

                          </td>

                          <td>

                            <button
                              onClick={() =>
                                handleViewUser(
                                  user._id
                                )
                              }
                              className="
                              bg-blue-600
                              text-white
                              px-4
                              py-2
                              rounded-lg
                              hover:bg-blue-700
                              transition
                              "
                            >
                              View
                            </button>

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          )
        }

      </div>

    </AdminLayout>

  );

}

export default Users;