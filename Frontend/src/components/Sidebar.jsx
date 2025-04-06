import React from "react";
import { PiFarmFill } from "react-icons/pi";
import { GoSidebarExpand } from "react-icons/go";

const prevchat = [
  { id: 1, name: "Best Crops for Winter Season" },
  { id: 2, name: "How to Improve Soil pH?" },
  { id: 3, name: "Selling Barley in Local Markets" },
  { id: 4, name: "Weather Forecast for Next Week" },
  { id: 5, name: "High-Sustainability Crops for Dry Regions" },
  { id: 6, name: "Crop Rotation Techniques" },
  { id: 7, name: "Best Practices for Irrigation" },
  { id: 8, name: "Real-Time Farm Monitoring Ideas" }
];


const Sidebar = () => {
  return (
    <>
      {/* <!-- drawer init and show --> */}
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

      {/* <!-- drawer component --> */}
      <div
        id="drawer-navigation"
        class="fixed top-0 left-0 z-60 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <PiFarmFill className="w-6 h-6 text-purple-500" />
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <GoSidebarExpand className="w-5 h-5" />
        </button>
        <div class="py-4 overflow-y-scroll">
          <ul class="space-y-2 font-medium">
            {prevchat?.map((item) => {
              return (
                <li>
                  <p className="text-gray-500 text-sm dark:text-white">
                    {item?.name.slice(0, 25)}....
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
