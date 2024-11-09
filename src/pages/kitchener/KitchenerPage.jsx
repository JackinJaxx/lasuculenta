import useKitchener from "@/hooks/KitchenerService";
import "./kitchener.css";
import { useCallback, useEffect, useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import HeaderComponent from "@/components/header/Header";
import ErrorIcon from "@/assets/icons/ErrorIcon";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import Loader from "@/components/spinner/Spinner";
import SearchBar from "@/components/search/Search";
import PerfilIcon from "@/assets/icons/PerfilIcon";
import useOrders from "@/hooks/OrderService";

const KitchenerPage = () => {
  const { data: kitcheners, loading, error, fetchKitcheners } = useKitchener();
  const {
    data: orders,
    loading: loadingOrders,
    error: errorOrders,
    getOrdeToMade,
    takePlatllo,
  } = useOrders();
  const [authState, setAuthState] = useState({
    selectedKitchener: null,
    isLoggedIn: false,
  });

  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda

  const {
    socketData,
    isConnected,
    error: errorSocket,
    connect,
    disconnect,
  } = useWebSocket(authState.selectedKitchener?.id, "kitchener");

  // Verifica el estado de autenticación en localStorage cuando se monta el componente
  // Verificar autenticación en localStorage y manejar errores de parseo

  useEffect(() => {
    try {
      const kitchenerData = localStorage.getItem("loggedKitchener");
      //remover waiter
      localStorage.removeItem("loggedWaiter");
      if (kitchenerData) {
        const parsedKitchener = JSON.parse(kitchenerData);
        if (parsedKitchener && parsedKitchener.id) {
          setAuthState({
            selectedKitchener: parsedKitchener,
            isLoggedIn: true,
          });
        } else {
          throw new Error("Datos de mesero no válidos en localStorage");
        }
      } else {
        fetchKitcheners(); // Cargar la lista de meseros si no hay un mesero autenticado
      }
    } catch (e) {
      console.error("Error al obtener el estado de autenticación:", e);
      localStorage.removeItem("loggedKitchener"); // Limpiar datos de mesero si hay error
    }
  }, []);

  useEffect(() => {
    if (errorSocket) {
      console.error("Error en el WebSocket:", errorSocket);
      handleLogout(); // Cierra la sesión y desconecta el WebSocket si hay error
      return;
    }

    if (isConnected) {
      if (socketData) {
        console.log("Datos del WebSocket", socketData);
      }
    }
  }, [errorSocket, isConnected, socketData]);

  // Función auxiliar para inicializar conexión y cargar órdenes

  // useEffect para verificar y conectar si el usuario está autenticado
  useEffect(() => {
    if (authState.isLoggedIn && authState.selectedKitchener && !isConnected) {
      if (!authState.selectedKitchener) {
        console.warn("Ningún mesero seleccionado para iniciar sesión");
        return;
      }
      connect(); // Conectar al WebSocket
      getOrdeToMade(); // Cargar órdenes
    }
  }, [authState.isLoggedIn, authState.selectedKitchener]);

  // Función para iniciar sesión del mesero seleccionado
  const handleLogin = () => {
    if (!authState.selectedKitchener) {
      console.warn("Ningún mesero seleccionado para iniciar sesión");
      return;
    }

    try {
      localStorage.setItem(
        "loggedKitchener",
        JSON.stringify(authState.selectedKitchener)
      );
      setAuthState((prevState) => ({ ...prevState, isLoggedIn: true }));
    } catch (e) {
      console.error("Error al guardar el mesero en localStorage:", e);
    }
  };

  // Función para cerrar sesión del mesero
  // Manejo de cierre de sesión
  const handleLogout = () => {
    try {
      localStorage.removeItem("loggedKitchener");
      setAuthState({ selectedKitchener: null, isLoggedIn: false });
      disconnect(); // Desconectar del WebSocket al cerrar sesión
      fetchKitcheners(); // Recargar la lista de meseros después de cerrar sesión
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
  };

  // Función para seleccionar un kitchener
  const handleSelectKitchener = (kitchener) => {
    setAuthState({
      ...authState,
      selectedKitchener:
        kitchener === authState.selectedKitchener ? null : kitchener,
    });
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filtrar los meseros en función del texto de búsqueda
  const filteredKitcheners = kitcheners.filter(
    (kitchener) =>
      kitchener.name.toLowerCase().includes(searchText.toLowerCase()) ||
      kitchener.lastname.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredPlatillos = orders.filter(
    (order) =>
      order.dish.name.toLowerCase().includes(searchText.toLowerCase()) ||
      order.dish.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleTomarPlatillo = (platillo) => {
    // Manejar la acción de tomar un platillo
    // takePlatllo([
    //   {
    //     order: {
    //       id:
    //     }
    //   }
    // ])
  };

  return (
    <>
      <div className="waiter-page">
        <HeaderComponent
          minimized={authState.isLoggedIn}
          user={authState.selectedKitchener}
          onLogout={handleLogout}
          isProfile={false}
        />
        <div className="menu-container">
          {error || errorOrders ? (
            <div className="error-msg">
              <ErrorIcon />
              <p>Ha ocurrido un error al cargar los meseros</p>
            </div>
          ) : loading || loadingOrders ? (
            <LoadingIcon />
          ) : (
            <div className="login-container">
              {!authState.isLoggedIn && <p>Selecciona tu perfil</p>}
              <div
                className={`login-items ${
                  authState.isLoggedIn ? "login-items-kitchener" : ""
                }`}
              >
                {authState.isLoggedIn && (
                  <p className="kitchener-header-secondary">
                    Platillos pendientes
                  </p>
                )}
                <div className={`${authState.isLoggedIn ? "login-row" : ""}`}>
                  <div className="search">
                    <SearchBar
                      placeholder={`${
                        authState.isLoggedIn ? "Filtrar" : "Busqueda"
                      }`}
                      onChange={handleSearchChange}
                    />
                  </div>
                  {authState.isLoggedIn ? (
                    <div className="platillos-container">
                      {filteredPlatillos.map((order, index) => (
                        <div className="platillo-waiting" key={index}>
                          <p>{order.dish.name}</p>
                          <button onClick={handleTomarPlatillo(order)}>
                            {order.current_process === "WAITING_KITCHENER"
                              ? "Tomar"
                              : "Completar"}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {filteredKitcheners.map((kitchener) => (
                        <div
                          key={kitchener.id}
                          className={`waiter-card ${
                            authState.selectedKitchener?.id === kitchener.id
                              ? "expanded"
                              : ""
                          }`}
                          onClick={() => handleSelectKitchener(kitchener)}
                        >
                          <div className="waiter-icon">
                            <PerfilIcon />
                          </div>
                          <div className="waiter-info">
                            <p>{kitchener.name + " " + kitchener.lastname}</p>
                            {authState.selectedKitchener?.id ===
                              kitchener.id && (
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
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Loader isLoading={false} />
    </>
  );
};
export default KitchenerPage;
