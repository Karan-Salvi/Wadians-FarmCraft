import React from "react";
import { AiOutlineWechatWork } from "react-icons/ai";
import { GoSidebarCollapse } from "react-icons/go";

const Navigation = () => {
  return (
    <>
      <nav class="w-screen bg-gray-100 border-gray-200 dark:bg-neutral-800 sm:hidden">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
          <button
            href="#"
            type="button"
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
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
          </button>
          <AiOutlineWechatWork className="text-white text-2xl" />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
