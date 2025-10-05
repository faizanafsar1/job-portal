import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { EmployerProvider } from "./context/EmployerContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserProvider>
      <EmployerProvider>
        <BrowserRouter>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={2000} // closes after 3s
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light" // light, dark, colored
          />
        </BrowserRouter>
      </EmployerProvider>
    </UserProvider>
  </AuthProvider>
);
