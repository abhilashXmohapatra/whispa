import { useState } from "react";
import dp from "/assets/dp.jpg";
import { Search, LogOut, X,} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import {
  setUserData,
  setSelectedUser,
  setSearchUser,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { userData, otherUsers, selectedUser, onlineUsers, searchUser } =
    useSelector((state) => state.user);
  const [searchInput, setsearchInput] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/user/search?query=${searchInput}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setSearchUser(result.data));
      console.log(result.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    if (searchInput.length == 0) {
      dispatch(setSearchUser(null));
    }
    if (searchInput) {
      handleSearch();
    }
  }, [searchInput]);
  return (
    <>
      <div
        className={`md:w-[30%] w-full bg-[#463355] md:block ${
          selectedUser ? "hidden" : "block"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-2 py-2 rounded-b-4xl">
          <div className="mb-4">
            <h1 className="text-white text-2xl font-bold">Whispa</h1>
          </div>

          <div className="flex items-center  mb-3">
            <div
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-white cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <img
                src={userData.image || dp}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-white text-lg font-medium ml-2">
              {userData.name || "user"}
            </h2>
          </div>

          {/* Search Input */}
          <div className="m-1">
            <form className="relative ">
              <div className=" flex items-center bg-gray-50 border-2 border-gray-200 rounded-full px-4 py-[6px] focus-within:border-blue-500 focus-within:bg-white transition-all duration-200">
                <Search className="w-5 h-5 text-gray-400 mr-4 cursor-pointer" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none"
                  onChange={(e) => setsearchInput(e.target.value)}
                  value={searchInput}
                />
                {searchInput?.length > 0 && <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => {
                    setsearchInput("");
                  }}
                />}
                
              </div>
              {/* search results area */}
              {searchUser?.length > 0 && (
                <div className="absolute top-[50px]  w-[100%] bg-gray-100 z-10 rounded-2xl overflow-scroll scroll-container">
                  {searchUser?.map((user) => (
                    <div
                      key={user._id}
                      className=" flex items-center hover:bg-gradient-to-r from-purple-500 to-blue-500 my-1 mx-2  p-2 cursor-pointer relative rounded-2xl"
                      onClick={() => {
                        dispatch(setSelectedUser(user));
                        setsearchInput("");
                      }}
                    >
                      <div className=" w-12 h-12 rounded-full overflow-hidden border-2 border-white cursor-pointer ">
                        <img
                          src={user.image || dp}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {onlineUsers?.includes(user._id) && (
                        <span className="w-3 h-3 bg-[#48ec50] rounded-full absolute left-[40px] bottom-[10px]"></span>
                      )}

                      <h2 className="text-black  ml-2">
                        {user.name || "user"}
                      </h2>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="overflow-scroll h-[400px] scroll-container p-2">
          {/* Other users list */}
          {[...(otherUsers || [])]
  .sort((a, b) => {
    if (selectedUser?._id === a._id) return -1;
    if (selectedUser?._id === b._id) return 1;
    return 0;
  })
  .map((user) => (
    <div
      key={user._id}
      className="flex items-center  hover:bg-gradient-to-r from-purple-500 to-blue-500  mt-2 rounded-xl p-2 cursor-pointer relative"
      onClick={() => dispatch(setSelectedUser(user))}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white cursor-pointer ">
        <img
          src={user.image || dp}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      {onlineUsers?.includes(user._id) && (
        <span className="w-3 h-3 bg-[#48ec50] rounded-full absolute left-[40px] bottom-[10px]"></span>
      )}
      <h2 className="text-white ml-2">{user.name || "user"}</h2>
    </div>
))}

        </div>
        ;{/* Logout Button */}
        <div className="absolute bottom-3 left-3">
          <button
            className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-400 hover:to-purple-400 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
