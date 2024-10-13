import { useContext, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import session from "../api/sessions_manager";
import { useNavigate } from "react-router-dom";

export const API_URL = process.env.REACT_APP_API_ENDPOINT;

/* General purpose hook for making API calls */
const useAPI = <T>(
  pathname: string,
  options?: AxiosRequestConfig,
  showError = true,
  p0?: { user_id: number },
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const { isAuth } = useContext(session.SessionContext);
  const navigate = useNavigate();
  const fetchAPI = async () => {
    try {
      const response = await axios(`${API_URL}${pathname}`, options);
      const data = await response.data;
      setData(data);
      setLoading(false);
      console.log("API call to:", pathname, "\n", data);
    } catch (error) {
      if (!isAuth) {
        navigate("/login");
        return;
      }
      if (showError) {
        alert("Error fetching data");
      }
    }
  };

  return { fetchAPI, loading, data, setData };
};

export default useAPI;
