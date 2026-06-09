import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

function Sidebar() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const menuItems = [

    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard"
    },

    {
      name: "Users",
      icon: <FaUsers />,
      path: "/users"
    },

    {
      name: "Reports",
      icon: <FaChartBar />,
      path: "/reports"
    },

    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings"
    }

  ];

  const handleLogout = () => {

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminUser"
    );

    navigate("/");

  };

  return (

    <div
      className="
      w-64
      h-screen
      bg-white
      border-r
      shadow-sm
      flex
      flex-col
      "
    >

      <div
        className="
        p-6
        border-b
        "
      >

        <h1
          className="
          text-xl
          font-bold
          text-blue-600
          "
        >
          ATS Admin
        </h1>

      </div>

      <div
        className="
        p-4
        space-y-2
        flex-1
        "
      >

        {
          menuItems.map(
            (item) => (

              <Link
                key={item.name}
                to={item.path}
                className={`
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition

                  ${
                    location.pathname ===
                    item.path

                      ? "bg-blue-100 text-blue-700 font-semibold"

                      : "hover:bg-blue-50"
                  }
                `}
              >

                {item.icon}

                {item.name}

              </Link>

            )
          )
        }

      </div>

      <div className="p-4">

        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-3
          text-red-500
          font-semibold
          "
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  );

}

export default Sidebar;