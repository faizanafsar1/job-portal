import { Link } from "react-router-dom";
import { faUser, faBookmark, faQuestionCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import IconAndLabelBtn from "./IconLabelAndBtn";

const Header = () => {
  const navItems = [
    { label: "Profile", path: "/jobseeker/profile", icon: faUser },
    { label: "Help", path: "/help", icon: faQuestionCircle },
    { label: "Privacy Center", path: "/", icon: faLock },
  ];

  return (
    <nav className="w-full z-50   px-6 py-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-xl text-primary-dark font-bold">
          Indeed
        </Link>
        <div className="flex space-x-4">
          {navItems.map((item, i) => (
            <Link key={i} to={item.path} className={`rounded-lg transition  hover:bg-primary-light text-white`}>
              <IconAndLabelBtn label={item.label} icon={item.icon} className="px-3 py-2 text-sm" />
            </Link>
          ))}
          <Link
            to="/employer/dashboard"
            className="text-gray-900 hover:text-primary-dark border-b-2 border-transparent  h-fit my-auto hover:border-primary-dark  font-medium"
          >
            Employers / Post Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
