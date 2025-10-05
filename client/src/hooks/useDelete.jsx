import { toast } from "react-toastify";
import { API } from "../config/config";
import { useAuth } from "../context/AuthContext";

export const useDeleteJob = () => {
  const { accessToken } = useAuth();
  const deleteJob = async (id) => {
    const res = await fetch(`${API}/delete-job/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
    }
    toast.error(data.message);
  };
  return deleteJob;
};
