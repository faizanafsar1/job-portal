import { Outlet } from "react-router-dom";
import EmployerFooter from "./EmployerFooter";
import EmployerNavbar from "./EmployerNavbar";

export default function PageLayoutEmployer() {
  return (
    <div className="min-h-screen flex-col flex">
      <EmployerNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <EmployerFooter />
    </div>
  );
}
