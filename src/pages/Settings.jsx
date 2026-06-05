import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";
import api from "../services/api";

function Settings() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchSettings();

  }, []);

  const fetchSettings =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        const response =
          await api.get(
            "/admin/settings",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setData(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const handleLogout = () => {

    localStorage.removeItem(
      "adminToken"
    );

    window.location.href = "/";

  };

  if (loading) {

    return (

      <AdminLayout>

        <p>
          Loading Settings...
        </p>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="space-y-6">

        <div>

          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Settings
          </h1>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            ATS Resume Checker
            Administration
          </p>

        </div>

        {/* Admin Profile */}

        <div
          className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-4
            "
          >
            Admin Profile
          </h2>

          <div className="space-y-3">

            <p>

              <strong>Name:</strong>
              {" "}
              {data.admin.name}

            </p>

            <p>

              <strong>Email:</strong>
              {" "}
              {data.admin.email}

            </p>

            <p>

              <strong>Role:</strong>
              {" "}
              {data.admin.role}

            </p>

          </div>

        </div>

        {/* Admin Accounts */}

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
            justify-between
            items-center
            mb-4
            "
          >

            <h2
              className="
              text-xl
              font-bold
              "
            >
              Admin Accounts
            </h2>

            <span
              className="
              bg-blue-100
              text-blue-700
              px-3
              py-1
              rounded-lg
              "
            >
              {
                data.admins.length
              } / 3 Admins
            </span>

          </div>

          <table
            className="
            w-full
            "
          >

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Name
                </th>

                <th className="text-left py-3">
                  Email
                </th>

                <th className="text-left py-3">
                  Created
                </th>

              </tr>

            </thead>

            <tbody>

              {
                data.admins.map(
                  (admin) => (

                    <tr
                      key={admin._id}
                      className="
                      border-b
                      "
                    >

                      <td className="py-4">
                        {admin.name}
                      </td>

                      <td>
                        {admin.email}
                      </td>

                      <td>
                        {
                          new Date(
                            admin.createdAt
                          ).toLocaleDateString()
                        }
                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

        {/* System Info */}

        <div
          className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-4
            "
          >
            System Information
          </h2>

          <div
            className="
            grid
            md:grid-cols-4
            gap-4
            "
          >

            <div>

              <p className="text-gray-500">
                Users
              </p>

              <h3
                className="
                text-2xl
                font-bold
                "
              >
                {
                  data.system.totalUsers
                }
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Resumes
              </p>

              <h3
                className="
                text-2xl
                font-bold
                "
              >
                {
                  data.system.totalResumes
                }
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Reports
              </p>

              <h3
                className="
                text-2xl
                font-bold
                "
              >
                {
                  data.system.totalReports
                }
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Version
              </p>

              <h3
                className="
                text-2xl
                font-bold
                "
              >
                {
                  data.system.version
                }
              </h3>

            </div>

          </div>

        </div>

        {/* Logout */}

        <div
          className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-4
            "
          >
            Account Actions
          </h2>

          <button
            onClick={
              handleLogout
            }
            className="
            bg-red-600
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-red-700
            "
          >
            Logout
          </button>

        </div>

      </div>

    </AdminLayout>

  );

}

export default Settings;