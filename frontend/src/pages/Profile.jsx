import { ArrowLeft, Camera, User, AtSign, Mail, Save } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "/assets/dp.jpg";
import { useRef, useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
  let { userData } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let [name, setname] = useState(userData.name || "");
  let [frontendImage, setFrontendImage] = useState(userData.image || dp);
  let [backendImage, setBackendImage] = useState(null);
  const image = useRef();
  const [saving, setsaving] = useState(false);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const handleProfile = async (e) => {
    e.preventDefault();
    setsaving(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });
      setsaving(false);
      dispatch(setUserData(result.data));
      navigate('/')
    } catch (error) {
      console.log(error);
      setsaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Arrow */}
        <button
          variant="ghost"
          size="icon"
          className="mb-6 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft
            className="h-6 w-6 text-gray-600 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Profile Image Section */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-35 h-35 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={frontendImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => image.current.click()}
                className="cursor-pointer absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleProfile} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <input
                type="file"
                hidden
                accept="image/*"
                ref={image}
                onChange={handleImage}
              />
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </label>
              <input
                value={name}
                type="text"
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-300"
                placeholder="Enter your full name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <AtSign className="w-4 h-4" />
                Username
              </label>
              <input
                type="text"
                value={userData.username}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-300 text-gray-500"
                readOnly
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                readOnly
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-300 text-gray-500"
              />
            </div>
            {/* Save Button */}
            <button
              disabled={saving}
              className="w-full py-2 px-2 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 cursor-pointer relative "
            >
              <Save className="w-5 h-5 absolute md:left-28 left-10" />
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
