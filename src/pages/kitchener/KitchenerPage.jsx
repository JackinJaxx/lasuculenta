import useKitchener from "@/hooks/KitchenerService";
import "./kitchener.css";
import { useEffect, useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import HeaderComponent from "@/components/header/Header";
import ErrorIcon from "@/assets/icons/ErrorIcon";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import Loader from "@/components/spinner/Spinner";
import SearchBar from "@/components/search/Search";
import PerfilIcon from "@/assets/icons/PerfilIcon";
import useOrders from "@/hooks/OrderService";
import Alert from "@/components/alert/AlertCustom";
import Helper from "@/components/helper/helper";

const KitchenerPage = () => {
  const { data: kitcheners, loading, error, fetchKitcheners } = useKitchener();
  const {
    data: orders,
    loading: loadingOrders,
    error: errorOrders,
    getOrdeToMade,
    takePlatllo,
    takePlatlloByFilter,
    completePlatllo,
  } = useOrders();
  const [authState, setAuthState] = useState({
    selectedKitchener: null,
    isLoggedIn: false,
  });

  const [kitchenerDishes, setKitchenerDishes] = useState([]);

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
    // Verifica que `orders.content` esté definido
    if (orders?.content) {
      console.log("Ordenes", orders.content);
      console.log("Platillos", kitchenerDishes);
      setKitchenerDishes((prevDishes) => {
        // Filtra los nuevos platillos que no están en `prevDishes`
        const newDishes = orders.content;

        // Si hay nuevos platillos, agrégalos; si no, devuelve el array actual
        return newDishes.length > 0
          ? [...prevDishes, ...newDishes]
          : prevDishes;
      });
    }
  }, [orders]);

  useEffect(() => {
    if (kitchenerDishes.length > 0) {
      const applyFlexWrap = () => {
        const platilloItems = document.querySelectorAll(".platillo-waiting");

        platilloItems.forEach((item) => {
          const pElement = item.querySelector("p");
          if (pElement && pElement.offsetWidth > 130) {
            item.style.flexWrap = "wrap"; // Cambia a wrap si el ancho de <p> supera 129px
            pElement.style.flex = "1";
            item.style.justifyContent = "flex-end";
          } else {
            item.style.flexWrap = "nowrap"; // Mantenlo en nowrap si no lo supera
          }
        });
      };

      // Aplica el estilo una vez al montar el componente
      applyFlexWrap();

      // Agrega un event listener para ajustar al cambiar el tamaño de la ventana
      window.addEventListener("resize", applyFlexWrap);
    }
  }, [kitchenerDishes]);

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
      takePlatlloByFilter({
        process: "GETTING_READY",
        kitchener: {
          id: authState.selectedKitchener.id,
        },
      })
        .then((data) => {
          setKitchenerDishes(data.content);
          getOrdeToMade(); // Cargar órdenes
        })
        .catch(() => {
          Alert.error("Error", "Ha ocurrido un error, se recargara la pagina");
          setAuthState({ selectedKitchener: null, isLoggedIn: false });
        });
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

  const filteredPlatillos = kitchenerDishes.filter(
    (order) =>
      order.dish_dto.name.toLowerCase().includes(searchText.toLowerCase()) ||
      order.dish_dto.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleTomarPlatillo = (platillo) => {
    // Manejar la acción de tomar un platillo
    takePlatllo([
      {
        order: {
          id: platillo.order_id,
        },
        cns: platillo.cns,
        madeBy: {
          id: authState.selectedKitchener.id,
        },
      },
    ])
      .then(() => {
        takePlatlloByFilter({
          process: "GETTING_READY",
          kitchener: {
            id: authState.selectedKitchener.id,
          },
        })
          .then((data) => {
            setKitchenerDishes(data.content);
            Alert.success("Exito", "Platillo tomado");
            getOrdeToMade();
          })
          .catch(() => {
            Alert.error(
              "Error",
              "Ha ocurrido un error al tomar el platillo, se recargara la pagina"
            );
            getOrdeToMade();
          });
      })
      .catch(() => {
        Alert.error("Error", "No se pudo enviar el pedido");
      });
  };

  const handleFinishPlatillo = (platillo) => {
    // Manejar la acción de tomar un platillo
    completePlatllo([
      {
        order: {
          id: platillo.order_id,
        },
        cns: platillo.cns,
        madeBy: {
          id: authState.selectedKitchener.id,
        },
      },
    ])
      .then(() => {
        takePlatlloByFilter({
          process: "GETTING_READY",
          kitchener: {
            id: authState.selectedKitchener.id,
          },
        })
          .then((data) => {
            setKitchenerDishes(data.content);
            Alert.success("Exito", "Platillo tomado");
            getOrdeToMade();
          })
          .catch(() => {
            Alert.error(
              "Error",
              "Ha ocurrido un error al tomar el platillo, se recargara la pagina"
            );
            getOrdeToMade();
          });
      })
      .catch(() => {
        Alert.error("Error", "No se pudo enviar el pedido");
      });
  };

  return (
    <>
      <div className="waiter-page">
        <HeaderComponent
          minimized={authState.isLoggedIn}
          user={authState.selectedKitchener}
          onLogout={handleLogout}
          isProfile={false}
          socket={{
            isConnected,
            socketData,
            callback: () => {
              takePlatlloByFilter({
                process: "GETTING_READY",
                kitchener: {
                  id: authState.selectedKitchener.id,
                },
              })
                .then((data) => {
                  setKitchenerDishes(data.content);
                  getOrdeToMade();
                })
                .catch(() => {
                  Alert.error(
                    "Error",
                    "Ha ocurrido un error al tomar el platillo, se recargara la pagina"
                  );
                  getOrdeToMade();
                });
            },
          }}
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
                      {filteredPlatillos.map((order, index) => {
                        console.log(order);
                        return (
                          <div
                            className={`platillo-waiting ${
                              order.currentProcess !== "WAITING_KITCHENER"
                                ? "platillo-waiting-ready"
                                : ""
                            }`}
                            key={index}
                          >
                            <p
                              className={`${
                                order.currentProcess !== "WAITING_KITCHENER"
                                  ? "platillo-p-ready"
                                  : ""
                              }`}
                            >
                              {order.dish_dto.name}
                            </p>
                            <button
                              className={`${
                                order.currentProcess !== "WAITING_KITCHENER"
                                  ? "platillo-b-ready"
                                  : ""
                              }`}
                              onClick={() => {
                                if (
                                  order.currentProcess === "WAITING_KITCHENER"
                                ) {
                                  handleTomarPlatillo(order);
                                } else {
                                  handleFinishPlatillo(order);
                                }
                              }}
                            >
                              {order.currentProcess === "WAITING_KITCHENER"
                                ? "Tomar"
                                : "Completar"}
                            </button>
                          </div>
                        );
                      })}
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
      <Helper />
      <Loader isLoading={false} />
    </>
  );
};
export default KitchenerPage;
