import { useEffect, useState, useRef, useCallback } from "react";

const useWebSocket = (userId, role) => {
  const [socketData, setSocketData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const socketRef = useRef(null);
  const baseWebSocketUrl = "ws:" + import.meta.env.VITE_BASE_URL + "/websocket"


  // Función para conectar al WebSocket
  const connect = useCallback(() => {
    if (!userId || !role || isConnected) return;

    const socket = new WebSocket(`${baseWebSocketUrl}?userId=${userId}&role=${role}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Conexión establecida");
      setIsConnected(true);
    };

    socket.onmessage = (message) => {
      console.log("Mensaje recibido", message.data);
      const data = JSON.parse(message.data);
      setSocketData(data); // Actualiza el estado con los datos recibidos
    };

    socket.onclose = () => {
      console.log("Conexión cerrada");
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error("Error en la conexión", error);
      setError(error);
    };
  }, [userId, role, isConnected]);

  // Función para desconectar del WebSocket
  const disconnect = useCallback(() => {
    try {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        setIsConnected(false);
        console.log("Desconexión manual del WebSocket");
      }
    } catch (error) {
      console.error("Error al desconectar el WebSocket:", error);
      // Opcional: Realizar cualquier otra acción si ocurre un error
    }
  }, []);
  

  useEffect(() => {
    // Limpiar conexión al desmontar el componente
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return { socketData, isConnected, error, connect, disconnect };
};

export default useWebSocket;
