import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await api.post(
            "/auth/login",
            {
              email,
              password
            }
          );

        const {
          token,
          user
        } = response.data;

        if (
          user.role !== "ADMIN"
        ) {

          alert(
            "Only admins can login."
          );

          return;

        }

        localStorage.setItem(
          "adminToken",
          token
        );

        localStorage.setItem(
          "adminUser",
          JSON.stringify(user)
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Login failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-100
    "
    >

      <div
        className="
        bg-white
        p-10
        rounded-2xl
        shadow-lg
        w-full
        max-w-md
      "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-2
        "
        >
          ATS Admin Login
        </h1>

        <p
          className="
          text-center
          text-gray-500
          mb-8
        "
        >
          Sign in to access admin dashboard
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            className="
              w-full
              border
              p-3
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
            className="
              w-full
              border
              p-3
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-xl
              font-semibold
              hover:bg-blue-700
              transition
            "
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;