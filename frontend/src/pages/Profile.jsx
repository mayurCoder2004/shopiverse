// imports remain the same
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <FaUserCircle size={80} className="text-purple-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome, {user.name.split(" ")[0]}!</h1>
        <p className="text-gray-600 mb-1">
          <span className="font-medium text-gray-700">Full Name:</span> {user.name}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-700">Email:</span> {user.email}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/edit-profile")}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
