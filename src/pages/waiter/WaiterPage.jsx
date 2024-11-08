import { useEffect, useState } from "react";
import HeaderComponent from "@/components/header/Header";
import "./waiter.css";
import useWaiters from "@/hooks/WaiterService";
import PerfilIcon from "@/assets/icons/PerfilIcon";
import SearchBar from "@/components/search/Search";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import ErrorIcon from "@/assets/icons/ErrorIcon";
import useWebSocket from "@/hooks/useWebSocket";
import Loader from "@/components/spinner/Spinner";

const WaiterPage = () => {
  const { data: waiters, loading, error, fetchWaiters } = useWaiters();
  const { data: platillos, loading: platillosLoading, error: platillosError, fetchPlatillos } = usePlatillos();
  const [authState, setAuthState] = useState({
    selectedWaiter: null,
    isLoggedIn: false,
  });
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda

  const {
    socketData,
    isConnected,
    error: errorSocket,
    connect,
    disconnect,
  } = useWebSocket(authState.selectedWaiter?.id, "waiter");

  // Verifica el estado de autenticación en localStorage cuando se monta el componente
  // Verificar autenticación en localStorage y manejar errores de parseo
  useEffect(() => {
    try {
      const waiterData = localStorage.getItem("loggedWaiter");
      if (waiterData) {
        const parsedWaiter = JSON.parse(waiterData);
        if (parsedWaiter && parsedWaiter.id) {
          setAuthState({
            selectedWaiter: parsedWaiter,
            isLoggedIn: true,
          });
          connect(); // Conectar al WebSocket si ya hay un mesero autenticado
        } else {
          throw new Error("Datos de mesero no válidos en localStorage");
        }
      } else {
        fetchWaiters();
      }
    } catch (e) {
      console.error("Error al obtener el estado de autenticación:", e);
      localStorage.removeItem("loggedWaiter"); // Limpiar localStorage en caso de error
    }
  }, []);

  useEffect(() => {
    if (errorSocket) {
      console.error("Error en el WebSocket:", errorSocket);
      handleLogout(); // Cierra la sesión y desconecta el WebSocket si hay error
    }
  }, [errorSocket]);

  // Función para iniciar sesión del mesero seleccionado
  const handleLogin = () => {
    if (!authState.selectedWaiter) {
      console.warn("Ningún mesero seleccionado para iniciar sesión");
      return;
    }

    try {
      localStorage.setItem(
        "loggedWaiter",
        JSON.stringify(authState.selectedWaiter)
      );
      setAuthState((prevState) => ({ ...prevState, isLoggedIn: true }));
      connect(); // Conectar al WebSocket después de iniciar sesión
    } catch (e) {
      console.error("Error al guardar el mesero en localStorage:", e);
    }
  };
  // Función para cerrar sesión del mesero
  // Manejo de cierre de sesión
  const handleLogout = () => {
    try {
      localStorage.removeItem("loggedWaiter");
      setAuthState({ selectedWaiter: null, isLoggedIn: false });
      disconnect(); // Desconectar del WebSocket al cerrar sesión
      fetchWaiters(); // Volver a cargar la lista de meseros al cerrar sesión
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  };

  // Función para seleccionar un mesero
  const handleSelectWaiter = (waiter) => {
    setAuthState({
      ...authState,
      selectedWaiter: waiter === authState.selectedWaiter ? null : waiter,
    });
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filtrar los meseros en función del texto de búsqueda
  const filteredWaiters = waiters.filter(
    (waiter) =>
      waiter.name.toLowerCase().includes(searchText.toLowerCase()) ||
      waiter.lastname.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderWaitersList = () => {
    return (
      <div className="login-container">
        <p>Selecciona tu perfil</p>

        <div className="login-items">
          <div className="search">
            <SearchBar placeholder="Busqueda" onChange={handleSearchChange} />
          </div>
          {filteredWaiters.map((waiter) => (
            <div
              key={waiter.id}
              className={`waiter-card ${
                authState.selectedWaiter?.id === waiter.id ? "expanded" : ""
              }`}
              onClick={() => handleSelectWaiter(waiter)}
            >
              <div className="waiter-icon">
                <PerfilIcon />
              </div>
              <div className="waiter-info">
                <p>{waiter.name + " " + waiter.lastname}</p>
                {authState.selectedWaiter?.id === waiter.id && (
                  <div className="waiter-actions">
                    <button
                      className="show"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el evento de clic se propague a la carta
                        handleLogin();
                      }}
                    >
                      Seleccionar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="waiter-page">
        <HeaderComponent
          minimized={authState.isLoggedIn}
          user={authState.selectedWaiter}
          onLogout={handleLogout}
        />
        {authState.isLoggedIn ? (
          
        ) : (
          // Contenido cuando el usuario no está logueado, dentro de `menu-container`
          <div className="menu-container">
            {error ? (
              <div className="error-msg">
                <ErrorIcon />
                <p>Ha ocurrido un error al cargar los meseros</p>
              </div>
            ) : loading ? (
              <LoadingIcon />
            ) : (
              renderWaitersList()
            )}
          </div>
        )}
      </div>
      <Loader isLoading={false} />
    </>
  );
};

export default WaiterPage;
