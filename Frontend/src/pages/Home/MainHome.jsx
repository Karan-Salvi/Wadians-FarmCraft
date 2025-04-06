import React, { useEffect, useRef, useState } from "react";
import { PiFarmFill } from "react-icons/pi";
import { GoSidebarCollapse } from "react-icons/go";
import { AiOutlineWechatWork } from "react-icons/ai";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Navigation from "../../components/Navigation";
import Sidebar from "../../components/Sidebar";
import { GoSidebarExpand } from "react-icons/go";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store";
import { addMessage } from "../../store/messageSlice";

const MainHome = () => {
  const userMessage = useRef()
  const [loaderStatus ,setloaderStatus] = useState(false)

  const messageList =  useSelector(store =>store.messages);
  const dispatch = useDispatch()
  console.log("messagelist is : ",messageList)
  const handleAIMessage = async ( event ) =>{
    event.preventDefault();
    setloaderStatus(true)
    const messageObject = {
      message:userMessage.current.value,
      sender:"user",
    };
    dispatch(addMessage(messageObject))
    const respoce  = await fetch("http://localhost:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: messageObject.message })
    });
    
    const data = await respoce.json();
    console.log("Final respoce data is : ",data);
    data.sender = "ai";
    console.log("The updated data : ", data)
    dispatch(addMessage(data))
    setloaderStatus(false)
    
    console.log(messageList)
    userMessage.current.value = "";

  }
  const messages = [
    {
      id: 1, // Unique key for React rendering
      text: "Hello! How can I help you today?",
      sender: "ai", // 'ai' or 'user'
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      text: "What’s the weather like today?",
      sender: "user",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      text: "I’m a text-based AI, so I can’t fetch real-time weather. Try asking a general question!",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
    {
      id: 1, // Unique key for React rendering
      text: "Hello! How can I help you today?",
      sender: "ai", // 'ai' or 'user'
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      text: "What’s the weather like today?",
      sender: "user",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      text: "I’m a text-based AI, so I can’t fetch real-time weather. Try asking a general question!",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
    {
      id: 1, // Unique key for React rendering
      text: "Hello! How can I help you today?",
      sender: "ai", // 'ai' or 'user'
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      text: "What’s the weather like today?",
      sender: "user",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      text: "I’m a text-based AI, so I can’t fetch real-time weather. Try asking a general question!",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
    {
      id: 1, // Unique key for React rendering
      text: "Hello! How can I help you today?",
      sender: "ai", // 'ai' or 'user'
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      text: "What’s the weather like today?",
      sender: "user",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      text: "I’m a text-based AI, so I can’t fetch real-time weather. Try asking a general question!",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ];

  const [theme, setTheme] = useState(() => {
    // On first load, read from localStorage or default to light
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };


  return (
    <>
      <Sidebar />
      {/* <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button> */}

      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-16 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-stone-950">
          <ul class="space-y-2 font-medium flex flex-col items-center w-full gap-4">
            <li>
              <a
                href="#"
                class="flex items-center justify-center w-10 h-10  text-gray-900 rounded-lg dark:text-white"
              >
                <PiFarmFill className="w-6 h-6 text-purple-500" />
              </a>
            </li>
            <li>
              {/* <div class="text-center">
                <button
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  type="button"
                  data-drawer-target="drawer-navigation"
                  data-drawer-show="drawer-navigation"
                  aria-controls="drawer-navigation"
                >
                  Show navigation
                </button>
              </div> */}
              <button
                href="#"
                type="button"
                data-drawer-target="drawer-navigation"
                data-drawer-show="drawer-navigation"
                aria-controls="drawer-navigation"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GoSidebarCollapse className="w-5 h-5" />
              </button>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <AiOutlineWechatWork className="w-6 h-6" />
              </a>
            </li>

            <li>
              <button onClick={toggleTheme}>
                {theme === "dark" ? (
                  <MdLightMode className="w-6 h-6 text-white" />
                ) : (
                  <MdDarkMode className="w-5 h-5" />
                )}
                {/* <MdDarkMode className="w-5 h-5" />
                <MdLightMode className="w-5 h-5" /> */}
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-14 h-full  bg-gray-100 dark:bg-neutral-800 min-h-screen max-h-screen overflow-y-scroll scrollbar-hide flex justify-center items-center flex-col">
        <Navigation />
        <div className="flex-1 p-4 sm:ml-14 overflow-y-scroll scrollbar-hide h-10/12  w-full">
          {messageList &&
            messageList.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{msg.sender == "user"? msg.message : msg?.response?.summary}</p>
                </div>
              </div>
            ))}
            {
              loaderStatus &&  <img src="/images/loader.svg" className="w-12 h-12" alt="" />
            }
            
          {/* <div ref={messagesEndRef} /> */}
        </div>
        <form className="w-5/6 md:w-3/6 min-w-72 p-1 " onSubmit={handleAIMessage}>
          <div class="w-full mb-4 border border-gray-200 dark:border-gray-600 rounded-4xl overflow-hidden bg-gray-50 ">
            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-stone-950">
              <label for="comment" class="sr-only">
                Ask your question
              </label>
              <textarea
                id="comment"
                rows="2"
                class="w-full  text-sm text-gray-900 p-3 bg-white border-0 dark:bg-stone-950 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Ask your question..."
                required
                ref={userMessage}
              ></textarea>
              <div class="flex items-center justify-end px-3 py-1  dark:border-gray-600 border-gray-200">
                {/* <div className="w-full h-auto">
                  {
                    
                  }
                </div> */}

                {/* <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                        <button
                          type="button"
                          class="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                        >
                          <svg
                            class="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 12 20"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                            />
                          </svg>
                          <span class="sr-only">Attach file</span>
                        </button>
                        <button
                          type="button"
                          class="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                        >
                          <svg
                            class="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                          >
                            <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                          </svg>
                          <span class="sr-only">Set location</span>
                        </button>
                        <button
                          type="button"
                          class="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                        >
                          <svg
                            class="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                          <span class="sr-only">Upload image</span>
                        </button>
                      </div> */}

                <button
                  onClick={()=>{
                    handleAIMessage("Which crop is best for india ? ")
                  }}
                  type="submit"
                  class="inline-flex items-center rounded-full p-2 text-xs font-medium text-center text-white bg-purple-700  focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
                >
                  <FaArrowUp className="text-base" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MainHome;
