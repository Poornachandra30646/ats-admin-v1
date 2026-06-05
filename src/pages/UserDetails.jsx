import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import api from "../services/api";

function UserDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchUserDetails();

  }, [id]);

  const fetchUserDetails =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        const response =
          await api.get(
            `/admin/user/${id}`,
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

        console.error(
          error
        );

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <AdminLayout>

        <div className="text-lg">
          Loading...
        </div>

      </AdminLayout>

    );

  }

  if (!data) {

    return (

      <AdminLayout>

        <div className="text-lg">
          User not found
        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <button
        onClick={() =>
          navigate(-1)
        }
        className="
        mb-6
        bg-gray-200
        px-4
        py-2
        rounded-lg
        hover:bg-gray-300
        "
      >
        ← Back
      </button>

      {/* User Profile */}

      <div
        className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        mb-6
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-4
          "
        >
          User Profile
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <p>
              <strong>Name:</strong>
              {" "}
              {data.user.name}
            </p>

            <p>
              <strong>Email:</strong>
              {" "}
              {data.user.email}
            </p>

          </div>

          <div>

            <p>
              <strong>Role:</strong>
              {" "}
              {data.user.role}
            </p>

            <p>
              <strong>Joined:</strong>
              {" "}
              {
                new Date(
                  data.user.createdAt
                ).toLocaleDateString()
              }
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div
        className="
        grid
        md:grid-cols-4
        gap-6
        mb-6
        "
      >

        <div
          className="
          bg-white
          rounded-2xl
          p-5
          shadow-sm
          "
        >

          <p className="text-gray-500">
            Total Resumes
          </p>

          <h2
            className="
            text-4xl
            font-bold
            mt-2
            "
          >
            {
              data.stats?.totalResumes || 0
            }
          </h2>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          p-5
          shadow-sm
          "
        >

          <p className="text-gray-500">
            Total Reports
          </p>

          <h2
            className="
            text-4xl
            font-bold
            mt-2
            "
          >
            {
              data.stats?.totalReports || 0
            }
          </h2>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          p-5
          shadow-sm
          "
        >

          <p className="text-gray-500">
            Average ATS Score
          </p>

          <h2
            className="
            text-4xl
            font-bold
            text-green-600
            mt-2
            "
          >
            {
              data.stats?.averageScore || 0
            }
          </h2>

        </div>

        <div
          className="
          bg-white
          rounded-2xl
          p-5
          shadow-sm
          "
        >

          <p className="text-gray-500">
            Role
          </p>

          <h2
            className="
            text-2xl
            font-bold
            mt-2
            "
          >
            {data.user.role}
          </h2>

        </div>

      </div>

      {/* Resumes */}

      <div
        className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        mb-6
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-5
          "
        >
          Uploaded Resumes
        </h2>

        {
          data.resumes.length === 0
            ? (
              <p>
                No resumes uploaded.
              </p>
            )
            : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th className="text-left py-3">
                        Resume Name
                      </th>

                      <th className="text-left py-3">
                        Version
                      </th>

                      <th className="text-left py-3">
                        Uploaded
                      </th>

                      <th className="text-left py-3">
                        Download
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      data.resumes.map(
                        (resume) => (

                          <tr
                            key={resume._id}
                            className="border-b"
                          >

                            <td className="py-4">
                              {
                                resume.originalFileName
                              }
                            </td>

                            <td>
                              {
                                resume.version
                              }
                            </td>

                            <td>
                              {
                                new Date(
                                  resume.createdAt
                                ).toLocaleDateString()
                              }
                            </td>

                            <td>

                              <a
                                href={resume.filePath}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                bg-blue-600
                                text-white
                                px-3
                                py-2
                                rounded-lg
                                text-sm
                                "
                              >
                                Download
                              </a>

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

      {/* ATS Reports */}

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
          text-2xl
          font-bold
          mb-5
          "
        >
          ATS Reports
        </h2>

        {
          data.reports.length === 0
            ? (
              <p>
                No ATS reports found.
              </p>
            )
            : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th className="text-left py-3">
                        ATS Score
                      </th>

                      <th className="text-left py-3">
                        Grade
                      </th>

                      <th className="text-left py-3">
                        Created
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      data.reports.map(
                        (report) => (

                          <tr
                            key={report._id}
                            className="border-b"
                          >

                            <td
                              className="
                              py-4
                              font-bold
                              text-blue-600
                              "
                            >
                              {report.score}
                            </td>

                            <td>
                              {report.atsGrade}
                            </td>

                            <td>
                              {
                                new Date(
                                  report.createdAt
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

            )
        }

      </div>

    </AdminLayout>

  );

}

export default UserDetails;