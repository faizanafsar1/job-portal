import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <div className="min-h-screen flex-col flex">
      <Navbar />
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
