import { useState } from "react";
import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { API } from "../config/config";

const EmployerContext = createContext();
export function EmployerProvider({ children }) {
  const [dashboardData, setDashboardData] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    const handleData = async () => {
      const res = await fetch(`${API}/dashboard-data`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setDashboardData(data);
    };
    handleData();
  }, [accessToken]);
  return <EmployerContext.Provider value={dashboardData}>{children}</EmployerContext.Provider>;
}
export const useEmployer = () => useContext(EmployerContext);
