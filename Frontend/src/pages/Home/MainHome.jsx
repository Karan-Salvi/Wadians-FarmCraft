import React, { useEffect, useRef, useState } from "react";
import { 
  Leaf, 
  PanelLeftClose, 
  MessageSquare, 
  ArrowUp, 
  Paperclip, 
  Mic, 
  Moon, 
  Sun, 
  Sparkles, 
  Bot, 
  User 
} from "lucide-react";

const MainHome = () => {
  const userMessage = useRef();
  const messagesEndRef = useRef();
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Simulated message list (replace with your Redux state)
  const [messageList, setMessageList] = useState([
    {
      id: 1,
      message: "Hello! I'm your AI farming assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
    }
  ]);

  const [theme, setTheme] = useState(() => {
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleAIMessage = async (event) => {
    if (event) event.preventDefault();
    if (!userMessage.current.value.trim()) return;
    
    setLoaderStatus(true);
    const newUserMessage = {
      id: Date.now(),
      message: userMessage.current.value,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    
    setMessageList(prev => [...prev, newUserMessage]);
    userMessage.current.value = "";
    setIsTyping(false);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        message: "I'm processing your request about farming. This is a simulated response.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessageList(prev => [...prev, aiResponse]);
      setLoaderStatus(false);
    }, 1500);
  };

  const handleTextareaChange = (e) => {
    setIsTyping(e.target.value.length > 0);
  };

  const quickActions = [
    "Best crops for my region",
    "Soil health analysis",
    "Weather forecast",
    "Pest control tips"
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Enhanced Sidebar */}
      <aside className="relative z-50">
        <div className="fixed top-0 left-0 h-screen w-16 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 hover:w-20">
          <div className="h-full px-3 py-4 flex flex-col items-center gap-6">
            {/* Logo */}
            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg transform transition-transform hover:scale-110">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            
            {/* Navigation Items */}
            <div className="flex-1 flex flex-col gap-4 mt-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="group p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <PanelLeftClose className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              </button>
              
              <button className="group p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              </button>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-all duration-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 group-hover:rotate-180 transition-all duration-500" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col ml-16">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800 dark:text-white">AI Farming Assistant</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Powered by advanced AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-xs font-medium">
                Online
              </span>
            </div>
          </div>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messageList.length === 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    userMessage.current.value = action;
                    handleAIMessage();
                  }}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:border-purple-400 dark:hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {messageList.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
              style={{animation: 'fadeIn 0.3s ease-out'}}
            >
              {msg.sender === "ai" && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              
              <div
                className={`max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl rounded-tr-sm"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm border border-gray-200 dark:border-gray-700"
                } px-4 py-3 shadow-md transform transition-all duration-200 hover:shadow-lg`}
              >
                <p className="text-sm leading-relaxed">{msg.message}</p>
                <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-purple-100" : "text-gray-400"}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {msg.sender === "user" && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {loaderStatus && (
            <div className="flex gap-3 animate-fadeIn" style={{animation: 'fadeIn 0.3s ease-out'}}>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-end gap-2 bg-gray-50 dark:bg-gray-800 rounded-2xl p-2 border border-gray-200 dark:border-gray-700 focus-within:border-purple-400 dark:focus-within:border-purple-600 transition-colors">
              <button
                type="button"
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              
              <textarea
                ref={userMessage}
                onChange={handleTextareaChange}
                rows="1"
                className="flex-1 bg-transparent border-0 outline-none resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 text-sm py-2"
                placeholder="Ask anything about farming..."
                style={{lineHeight: '1.5'}}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAIMessage(e);
                  }
                }}
              />
              
              <button
                type="button"
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Mic className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              
              <button
                onClick={handleAIMessage}
                disabled={!isTyping}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isTyping
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg transform hover:scale-105"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <ArrowUp className={`w-4 h-4 ${isTyping ? "text-white" : "text-gray-400"}`} />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MainHome;