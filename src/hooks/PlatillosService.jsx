import { useState } from "react";
import fetchData from "@utils/FetchData";
import apiEndpoints from "@/apiEndpoints";

const usePlatillos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Función para obtener la lista de platillos
  const fetchPlatillos = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(baseUrl + apiEndpoints.platillos.getAll);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para guardar un nuevo platillo
  const savePlatillo = async (platilloData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchData(
        "https://7c366e536fe34a129598d8cd91c767f3.api.mockbin.io/",
        { method: "POST", body: platilloData }
      );
      setData((prevData) => [...prevData, response]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchPlatillos, savePlatillo };
};

export default usePlatillos;
