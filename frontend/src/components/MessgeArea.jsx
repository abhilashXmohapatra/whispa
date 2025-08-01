import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import dp from "/assets/dp.jpg";
import { setSelectedUser } from "../redux/userSlice";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessages } from "../redux/messageSlice";
import { Smile, ImagePlus, Send, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Spinner from "./Spinner";
const MessgeArea = () => {
  const { selectedUser, userData, socket, onlineUsers } = useSelector(
    (state) => state.user
  );
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [frontendImgage, setfrontendImgage] = useState("");
  const [backendImage, setbackendImage] = useState("");
  const [loading, setloading] = useState(false)
  const textareaRef = useRef(null);
  const imageInput = useRef();
  const onEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setShowEmojis(false);
    // Auto-resize textarea
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const handleSendMessage = async () => {
    setloading(true)
    try {
      let formData = new FormData();
      formData.append("message", message);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      setloading(false)
      dispatch(setMessages([...messages, result.data]));
      setMessage("");
      setfrontendImgage("");
      setbackendImage("");
    } catch (error) {
      console.log(error);
    }
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setfrontendImgage(URL.createObjectURL(file));
    setbackendImage(file);
  };
  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]));
    });
    return () => socket.off("newMessage");
  }, [messages, setMessages]);

  return (
    <>
      <div
        className={`md:w-[70%] w-full flex-1 bg-[#342e3f] relative md:block ${
          selectedUser ? "block" : "hidden"
        }`}
      >
        {/* Top bar */}
        {selectedUser && (
          <>
            <div className="h-[70px]">
              <div
                className="flex items-center bg-[#4c4261] 
         mx-2 rounded-xl p-2 cursor-pointer gap-1 relative"
              >
                {/* back arrow */}

                <button
                  variant="ghost"
                  size="icon"
                  className=" hover:bg-[#5e576e] transition-colors mr-2"
                  onClick={() => dispatch(setSelectedUser(null))}
                >
                  <ArrowLeft className="h-6 w-6 text-white cursor-pointer" />
                </button>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white cursor-pointer ">
                  <img
                    src={selectedUser?.image || dp}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {onlineUsers?.includes(selectedUser._id) && (
                  <span className="w-3 h-3 bg-[#48ec50] rounded-full absolute left-[80px] bottom-[10px]"></span>
                )}
                <div className="flex flex-col">
                  <h2 className="text-white  ml-2">
                    {selectedUser?.name || "user"}
                  </h2>
                  {onlineUsers?.includes(selectedUser._id) ? (
                    <span className="text-gray-300 text-[12px] font-medium ml-2">
                      online
                    </span>
                  ):(<span className="text-gray-300 text-[12px] font-medium ml-2">
                      offline
                    </span>)}
                </div>
              </div>
            </div>
            {/* messages area */}
            <div className="md:h-[80vh] h-[83vh] py-2 w-full flex flex-col px-6 scroll-container gap-2">
              {messages &&
                messages.map((mess) =>
                  mess.sender === userData._id ? (
                    <SenderMessage image={mess.image} message={mess.message} />
                  ) : (
                    <ReceiverMessage
                      image={mess.image}
                      message={mess.message}
                    />
                  )
                )}
            </div>
          </>
        )}

        {/* Welcome Message */}
        {!selectedUser && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Welcome to Whispa
              </h2>
              <p className="text-gray-300 max-w-md">
                Select a conversation from the sidebar or start a new chat to
                begin messaging.
              </p>
            </div>
          </div>
        )}

        {/* input bar */}
        {selectedUser && (
          <div className="absolute bottom-0 w-full ">
            {/* Emoji Picker */}
            {showEmojis && (
              <EmojiPicker
                width={250}
                height={350}
                onEmojiClick={onEmojiClick}
              />
            )}
            {frontendImgage && (
              <div className="right-5 absolute bottom-[80px] bg-[#4c4261] rounded-2xl p-1">
                <img
                  src={frontendImgage}
                  alt=""
                  className="w-auto h-[200px] rounded-xl"
                />
              </div>
            )}

            <div className="bg-[#4c4261] px-4 py-3 ">
              <div className="flex items-end space-x-3">
                {/* Emoji Button */}
                <button
                  onClick={() => {
                    setShowEmojis(!showEmojis);
                  }}
                  className="p-2 text-white hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 cursor-pointer"
                >
                  <Smile className="w-6 h-6" />
                </button>

                {/* Image Button */}
                <button
                  className="p-2 text-white hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    imageInput.current.click();
                    setShowEmojis(false);
                  }}
                >
                  <ImagePlus className="w-6 h-6" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={imageInput}
                  onChange={handleImage}
                />
                {/* Input Container */}
                <div className="flex-1 bg-white rounded-3xl border border-gray-300 px-3 py-2 focus-within:border-[#2c253b] transition-colors">
                  <input
                    type="text"
                    ref={textareaRef}
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message"
                    className="w-full resize-none outline-none text-gray-700 placeholder-gray-400 leading-6 max-h-32 overflow-y-auto"
                    rows="1"
                  />
                </div>
                {/* Send Button */}
                {(message.trim().length > 0 || backendImage != "") && (
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-400 hover:to-purple-400  text-white rounded-full transition-colors flex-shrink-0 cursor-pointer"
                  >
                  
                    
                    {loading? <div className="flex items-center justify-center">
                    <Spinner />
                    </div>: <Send className="w-4 h-4" />
                    }
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MessgeArea;
