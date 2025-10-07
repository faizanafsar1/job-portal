import { Link } from "react-router-dom";
import { faUser, faQuestionCircle, faLock, faBriefcase, faBriefcaseClock } from "@fortawesome/free-solid-svg-icons";
import IconAndLabelBtn from "./IconLabelAndBtn";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const Header = () => {
  const { accessToken } = useAuth();
  const navItems = [
    { label: "Profile", path: "/jobseeker/profile", icon: faUser },
    { label: "Help", path: "/help", icon: faQuestionCircle },
    { label: "Privacy Center", path: "/", icon: faLock },
    { label: "Employers / Post Job", path: "/employer/dashboard", icon: faBriefcase },
  ];

  return (
    <nav className="w-full z-50   px-6 py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-xl text-primary-dark font-bold">
          Talento
        </Link>
        <div className="flex items-center space-x-4">
          {navItems.map((item, i) => (
            <Link key={i} to={item.path} className={`rounded-lg h-[37px]    hover:bg-primary-light text-white`}>
              <IconAndLabelBtn label={item.label} icon={item.icon} className="px-3 py-2 text-sm" />
            </Link>
          ))}

          {!accessToken && (
            <>
              <Link to={"/login"}>
                <Button label="login " style={"secondary"} className="px-3 py-2 text-sm" />
              </Link>
              <Link to={"/signup"}>
                <Button label="Signup" style={"primary"} className="px-3 py-2 text-sm" />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
