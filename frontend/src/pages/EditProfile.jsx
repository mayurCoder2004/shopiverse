import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser({ ...data, password: "" }); // don't fill password field
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated!");
      navigate("/profile"); // ⬅️ redirect back
    } catch (err) {
      alert("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden p-6">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-bounce delay-1000">✏️</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-20 animate-bounce delay-2000">✨</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl opacity-20 animate-bounce delay-500">💎</div>
        <div className="absolute bottom-1/4 right-1/3 text-4xl opacity-20 animate-bounce delay-1500">🎁</div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 hover:shadow-3xl transition-all duration-300"
      >
        <div className="mb-6 text-center">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-semibold rounded-full border border-purple-200 shadow-sm animate-pulse mb-4">
            ✨ Update Your Info
          </span>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Edit Profile
          </h2>
        </div>

        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-4 px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
        />

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
        />

        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="w-full mb-6 px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
        />

        <button
          type="submit"
          className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>Save Changes</span>
            <span className="text-lg group-hover:rotate-12 transition-transform duration-300">💾</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text font-medium cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            ← Back to Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;