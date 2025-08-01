import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setUserData } from "../redux/userSlice";

const Login = () => {
  const [showPass, setshowPass] = useState(false);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      dispatch(setSelectedUser(null));
      navigate("/");
      seterr("");
      setemail("");
      setpassword("");

      setloading(false);
    } catch (error) {
      console.log(error);
      seterr(error.response.data.message);

      setloading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-indigo-200 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-10 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-5 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="transition-all duration-300 ease-in-out">
            <div className="flex flex-col items-center gap-3 mb-5 p-2">
              <img src="/assets/logo.png" width={45} alt="logo" />
              <h1 className="text-2xl font-bold mt-1">Welcome Back</h1>
              <p> Login to continue your conversations</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="space-y-2 my-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-300"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2 my-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-300"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setshowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showPass ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {err && <p className="text-center text-red-600">{err}</p>}
              </div>
              <div className="m-2">
                <button
                  disabled={loading}
                  className="w-full py-2 px-2 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 cursor-pointer"
                >
                  {loading ? "loading..." : "Log in"}
                </button>
              </div>
              <div className="m-2 text-center">
                <p className="text-gray-600">
                  Don't have an account?
                  <button
                    onClick={() => navigate("/signup")}
                    className="m-1 text-purple-600 hover:text-purple-500 font-semibold transition-colors cursor-pointer"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
