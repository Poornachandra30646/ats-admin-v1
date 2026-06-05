import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] =
    useState({

      totalUsers: 0,

      totalResumes: 0,

      totalReports: 0

    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        const response =
          await api.get(
            "/admin/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStats({

          totalUsers:
            response.data.totalUsers,

          totalResumes:
            response.data.totalResumes,

          totalReports:
            response.data.totalReports

        });

      } catch (error) {

        console.error(
          "Dashboard Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <AdminLayout>

      <div
        className="
        grid
        grid-cols-4
        gap-6
        "
      >

        <StatCard
          title="Total Users"
          value={
            loading
              ? "..."
              : stats.totalUsers
          }
        />

        <StatCard
          title="Total Resumes"
          value={
            loading
              ? "..."
              : stats.totalResumes
          }
        />

        <StatCard
          title="Total Reports"
          value={
            loading
              ? "..."
              : stats.totalReports
          }
        />

        <StatCard
          title="System Status"
          value="Online"
        />

      </div>

      <div
        className="
        mt-8
        bg-white
        rounded-2xl
        shadow-sm
        p-6
        "
      >

        <h3
          className="
          text-xl
          font-bold
          mb-4
          "
        >
          Admin Overview
        </h3>

        <p className="text-gray-600">

          ATS Resume Checker
          administration dashboard.

        </p>

        <div
          className="
          mt-6
          space-y-3
          "
        >

          <div>
            👥 Users Registered:
            {" "}
            <strong>
              {stats.totalUsers}
            </strong>
          </div>

          <div>
            📄 Resumes Uploaded:
            {" "}
            <strong>
              {stats.totalResumes}
            </strong>
          </div>

          <div>
            📊 Reports Generated:
            {" "}
            <strong>
              {stats.totalReports}
            </strong>
          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default Dashboard;