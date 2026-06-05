import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";
import api from "../services/api";

function Reports() {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        const response =
          await api.get(
            "/admin/report-analytics",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setAnalytics(
          response.data.analytics
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <AdminLayout>

        <p>
          Loading Analytics...
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
            Reports & Analytics
          </h1>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            ATS Resume Checker
            Business Overview
          </p>

        </div>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          "
        >

          <div
            className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            "
          >

            <p className="text-gray-500">
              Total Users
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-2
              "
            >
              {
                analytics.totalUsers
              }
            </h2>

          </div>

          <div
            className="
            bg-white
            rounded-2xl
            p-6
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
                analytics.totalResumes
              }
            </h2>

          </div>

          <div
            className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            "
          >

            <p className="text-gray-500">
              Total ATS Reports
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-2
              "
            >
              {
                analytics.totalReports
              }
            </h2>

          </div>

          <div
            className="
            bg-white
            rounded-2xl
            p-6
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
                analytics.averageScore
              }
            </h2>

          </div>

        </div>

        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          "
        >

          <div
            className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            "
          >

            <h3
              className="
              text-xl
              font-bold
              mb-4
              "
            >
              Resume Formats
            </h3>

            <div className="space-y-3">

              <div
                className="
                flex
                justify-between
                "
              >
                <span>PDF</span>
                <span>
                  {
                    analytics.pdfCount
                  }
                </span>
              </div>

              <div
                className="
                flex
                justify-between
                "
              >
                <span>DOC</span>
                <span>
                  {
                    analytics.docCount
                  }
                </span>
              </div>

              <div
                className="
                flex
                justify-between
                "
              >
                <span>DOCX</span>
                <span>
                  {
                    analytics.docxCount
                  }
                </span>
              </div>

            </div>

          </div>

          <div
            className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            "
          >

            <h3
              className="
              text-xl
              font-bold
              mb-4
              "
            >
              ATS Score Insights
            </h3>

            <div className="space-y-3">

              <div
                className="
                flex
                justify-between
                "
              >
                <span>Highest Score</span>
                <span
                  className="
                  font-bold
                  text-green-600
                  "
                >
                  {
                    analytics.highestScore
                  }
                </span>
              </div>

              <div
                className="
                flex
                justify-between
                "
              >
                <span>Lowest Score</span>
                <span
                  className="
                  font-bold
                  text-red-500
                  "
                >
                  {
                    analytics.lowestScore
                  }
                </span>
              </div>

            </div>

          </div>

          <div
            className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
            "
          >

            <h3
              className="
              text-xl
              font-bold
              mb-4
              "
            >
              Platform Health
            </h3>

            <div className="space-y-3">

              <div
                className="
                flex
                justify-between
                "
              >
                <span>Users</span>
                <span>
                  {
                    analytics.totalUsers
                  }
                </span>
              </div>

              <div
                className="
                flex
                justify-between
                "
              >
                <span>Resumes</span>
                <span>
                  {
                    analytics.totalResumes
                  }
                </span>
              </div>

              <div
                className="
                flex
                justify-between
                "
              >
                <span>Reports</span>
                <span>
                  {
                    analytics.totalReports
                  }
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default Reports;