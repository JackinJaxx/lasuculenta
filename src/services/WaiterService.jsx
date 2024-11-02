import { useState } from "react";
import fetchData from "@utils/FetchData";

const useWaiters = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener la lista de meseros
  const fetchWaiters = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData("https://2f1969941aa14f9aa96faf51882b57d3.api.mockbin.io/");
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para guardar un nuevo mesero
  const saveWaiter = async (waiterData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchData(
        "https://2f1969941aa14f9aa96faf51882b57d3.api.mockbin.io/",
        { method: "POST", body: waiterData }
      );
      setData((prevData) => [...prevData, response]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchWaiters, saveWaiter };
};

export default useWaiters;
