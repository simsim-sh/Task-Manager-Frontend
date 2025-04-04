import React, { useState, useEffect } from "react";
import {
  FileText,
  PlayCircle,
  CheckCircle,
  PlusCircle,
  Calendar,
  Users,
} from "lucide-react";
import {
  Package,
  ShoppingCart,
  CreditCard,
  Box,
  Truck,
  RefreshCw,
} from "lucide-react";
import ChartComponent from "../Component/ChartComponent";
import BarChartComponent from "../Component/BarChartComponent";
import backgroundImg from "../assets/images/background.jpg";
import { NavLink } from "react-router-dom";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Detect screen size changes
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Only auto-close sidebar on mobile screens
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Mobile menu button - only visible on small screens */}
      <div className="fixed top-4 left-4 z-50 block md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-blue-500 text-white rounded-md shadow-md"
        >
          {sidebarOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 bg-gradient-to-r from-blue-50 to-purple-50">
        <Sidebar />
        {/* Dashboard Content */}
        <main className="flex-1 p-3 pt-1 sm:pt-1  md:pt-1 sm:p-4 md:p-6">
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* 7 columns*/}
            <div className="col-span-1 md:col-span-7 space-y-6">
              {/* Card-text */}
              <div className="bg-blue-800  rounded-lg p-4 sm:p-6 relative overflow-hidden">
                <div className="text-white z-10 relative pt-12">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg">
                    Good Morning, Navix Team!
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg drop-shadow-md mt-2">
                    Here's what's happening with your projects today
                  </p>

                  {/* crad-bottom-text */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 md:mt-12 lg:mt-16">
                    {/* total project div */}
                    <div className="bg-blue-500 bg-opacity-30 rounded-lg p-3 text-center">
                      <p className="text-base sm:text-lg font-bold">
                        Total Projects
                      </p>
                      <p className="text-xl sm:text-2xl">32</p>
                    </div>

                    {/* Completed Projects  div*/}
                    <div className="bg-blue-500 bg-opacity-30 rounded-lg p-3 text-center">
                      <p className="text-base sm:text-lg font-bold">
                        Completed Projects
                      </p>
                      <p className="text-xl sm:text-2xl">23</p>
                    </div>

                    {/* Pending Projects  div*/}
                    <div className="bg-blue-500 bg-opacity-30 rounded-lg p-3 text-center">
                      <p className="text-base sm:text-lg font-bold">
                        Pending Projects
                      </p>
                      <p className="text-xl sm:text-2xl text-red-600 blink">
                        13
                      </p>
                    </div>
                  </div>
                </div>

                {/* card-Background-Image */}
                <div className="absolute right-0 bottom-0 md:right-4 md:top-1/2 md:-translate-y-1/2 max-w-[40%] md:max-w-[30%] opacity-60 md:opacity-80">
                  <img
                    src={backgroundImg}
                    alt="Background"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-1 gap-4">
                {/* Chart 1 */}
                <div className="bg-white rounded-lg p-4 shadow-md h-60 sm:h-64 md:h-72">
                  <ChartComponent />
                </div>

                {/* Chart 2 */}
                <div className="bg-white rounded-lg p-4 shadow-md h-60 sm:h-64 md:h-72">
                  <BarChartComponent />
                </div>
              </div>
            </div>

            {/* col-5 */}
            <div className="col-span-1 md:col-span-5 rounded-lg p-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 lg:grip-cols-2 xl:grid-cols-2">
                {/* left-Cards */}
                <NavLink
                  to="/project"
                  className="bg-white shadow-xl rounded-lg p-8 flex items-center space-x-4"
                >
                  <div className="icon bg-blue-500 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    <FileText className="mx-auto text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      All Project
                    </h3>
                    <h2 className="text-2xl font-bold">500</h2>
                    <div className="text-xs text-gray-500 flex items-center space-x-2">
                      <span></span>
                      <span className="font-semibold text-green-500">
                        5.5% ↑
                      </span>
                    </div>
                  </div>
                </NavLink>

                <div className="bg-white shadow-xl rounded-lg p-8 flex items-center space-x-4">
                  <div className="icon bg-red-500 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    <PlayCircle className="mx-auto text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      Running Project
                    </h3>
                    <h2 className="text-2xl font-bold">204</h2>
                    <div className="text-xs text-gray-500 flex items-center space-x-2">
                      <span></span>
                      <span className="font-semibold text-green-500">
                        2.5% ↑
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-xl rounded-lg p-8 flex items-center space-x-4">
                  <div className="icon bg-cyan-500 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    <CheckCircle className="mx-auto text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      Completed
                    </h3>
                    <h2 className="text-2xl font-bold">105</h2>
                    <div className="text-xs text-gray-500 flex items-center space-x-2">
                      <span>560</span>
                      <span className="font-semibold text-red-500">1.5% ↓</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-xl rounded-lg p-8 flex items-center space-x-4">
                  <div className="icon bg-green-500 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    <PlusCircle className="mx-auto text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      New Poject
                    </h3>
                    <h2 className="text-2xl font-bold">12,345</h2>
                    <div className="text-xs text-gray-500 flex items-center space-x-2">
                      <span>10,320</span>
                      <span className="font-semibold text-green-500">
                        11.5% ↑
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-xl rounded-lg p-8 flex items-center space-x-4">
                  <div className="icon bg-purple-500 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    <Calendar className="mx-auto text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      Upcoming Deadlines
                    </h3>
                    <h2 className="text-2xl font-bold">360</h2>
                    <div className="text-xs text-gray-500 flex items-center space-x-2">
                      <span>450</span>
                      <span className="font-semibold text-red-500">1.5% ↓</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-xl rounded-lg p-8 flex items-center space-x-4">
                  <div className="icon bg-blue-800 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    <Users className="mx-auto text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">
                      Team Performance
                    </h3>
                    <h2 className="text-2xl font-bold">84</h2>
                    <div className="text-xs text-gray-500 flex items-center space-x-2">
                      <span>64</span>
                      <span className="font-semibold text-green-500">
                        2.5% ↑
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
