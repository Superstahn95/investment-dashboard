import { forwardRef } from "react";
import { Link, NavLink } from "react-router-dom";

// import { SunIcon } from "@heroicons/react/outline";

const userRole = "admin";

// const userLinks = [
//     {link: "D"}
// ]
// const links = userRole === "admin" ? AdminLinks : null;
const SideBar = forwardRef(({ showNav, navigationLinks }, ref) => {
  return (
    <div
      ref={ref}
      className="fixed w-56 h-full bg-white dark:bg-slate-900 shadow-md font-montserrat"
    >
      <div className="flex flex-col pt-20">
        {navigationLinks.map((link) => (
          <NavLink
            end
            key={link.link}
            to={link.to}
            className={({ isActive, isPending }) =>
              isActive
                ? "bg-orange-100 text-orange-500 hover:bg-orange-100 hover:text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500 dark:text-white"
            }
          >
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors  
             
       `}
            >
              <div className="mr-2">{link.icon}</div>
              <div>
                <p>{link.link}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
});
function isActive(path) {
  return (window.location.pathname = path);
}

SideBar.displayName = "SideBar";

export default SideBar;
