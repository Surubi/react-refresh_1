import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleExpand } from "../features/menue-ctrl/menue-visiblity-ctrl.store";
import { KEY_CLOAK } from "..";

export const MainMenue = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const activeMenuClass = "flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-indigo-600 text-white font-medium transition duration-150 ease-in-out";
  const inactiveMenuClass = "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white font-medium transition duration-150 ease-in-out";

  const activateMenu = (menuName: string) => {
    switch (menuName) {
      case "Dashboard":
        setActiveMenu("Dashboard");
        break;
      case "Actors":
        setActiveMenu("Actors");
        break;
      case "Films":
        setActiveMenu("Films");
        break;
      case "Projects":
        setActiveMenu("Projects");
        break;
      case "Settings":
        setActiveMenu("Settings");
        break;
      default:
        setActiveMenu("Dashboard");
        break;
    }
    //setIsCollapsed(true);
  }

  //const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  // isVisible: boolean = false; 
  const isCollapsed: boolean = useSelector((state: any) => state.toggleMenue.toggle);
  const setIsCollapsed = (open: boolean) => {
    dispatch(toggleExpand({ toggle: open }));
  };


  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-60"
        } bg-slate-900 text-white flex flex-col shadow-lg transition-all duration-300`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {/* Toggle Button */}
      {/* <div className="flex justify-end p-2">
        <button
          onClick={() => setIsCollapsed()}
          className="text-slate-400 hover:text-white"
        >
          {isCollapsed ? "➡️" : "⬅️"}
        </button>
      </div> */}

      {/* Navigation Menu */}
      <nav className="space-y-1 overflow-auto p-3 h-[27rem]">
        <Link
          to="/"
          className={activeMenu === "Dashboard" ? activeMenuClass : inactiveMenuClass}
          onClick={() => activateMenu("Dashboard")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10h3m10-11l2 2v10h-3m-6 0v-4h2v4h2"
            />
          </svg>
          {!isCollapsed && <span>Dashboard</span>}
        </Link>

        <Link
          to="/actors"
          className={activeMenu === "Actors" ? activeMenuClass : inactiveMenuClass}
          onClick={() => activateMenu("Actors")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6H5v6h4zm0-10V9h4v10H9zm6 0V5h4v14h-4z"
            />
          </svg>
          {!isCollapsed && <span>Actors</span>}
        </Link>

        <Link
          to="/films"
          className={activeMenu === "Films" ? activeMenuClass : inactiveMenuClass}
          onClick={() => activateMenu("Films")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6H5v6h4zm0-10V9h4v10H9zm6 0V5h4v14h-4z"
            />
          </svg>
          {!isCollapsed && <span>Films</span>}
        </Link>
        <Link
          to="/projects"
          className={activeMenu === "Projects" ? activeMenuClass : inactiveMenuClass}
          onClick={() => activateMenu("Projects")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6H5v6h4zm0-10V9h4v10H9zm6 0V5h4v14h-4z"
            />
          </svg>
          {!isCollapsed && <span>Projects</span>}
        </Link>

        <Link
          to="/settings"
          className={activeMenu === "Settings" ? activeMenuClass : inactiveMenuClass}
          onClick={() => activateMenu("Settings")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6H5v6h4zm0-10V9h4v10H9zm6 0V5h4v14h-4z"
            />
          </svg>
          {!isCollapsed && <span>Settings</span>}
        </Link>

        {/* Add other links (Films, Projects, Settings) the same way */}
      </nav>

      {/* Bottom Section (User Profile) */}
      <div className="border-t border-slate-800 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            className="w-9 h-9 rounded-full"
            src="/assets/img/logo.jpg"
            alt="User avatar"
          />
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold">Sudhir Giri</p>
              <p className="text-xs text-slate-400">
                sudhir24econtact@gmail.com
              </p>
            </div>
          )}
        </div>
        <button className="text-slate-400 hover:text-white" onClick={() => {
          KEY_CLOAK.logout({
            redirectUri: "http://localhost:3000/login"
          });
        }}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </aside>);

};