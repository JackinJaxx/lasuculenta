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
import CategoryPicker from "@/components/categoryPicker/CategoryPicker";
import usePlatillos from "@/hooks/PlatillosService";
import MenuContainer from "@/components/menuContainer/MenuContainer";
import ShoppingCard from "@/components/shoppingCard/ShoppingCard";
import ModalTable from "@/components/modal/ModalTable";
import useOrders from "@/hooks/OrderService";
import Alert from "@/components/alert/AlertCustom";
import Helper from "@/components/helper/helper";
import NotificationFloat from "@/components/Notifications/NotificationFloat";
import HelperIcon from "@/assets/icons/HelperIcon";

const WaiterPage = () => {
  const { data: waiters, loading, error, fetchWaiters } = useWaiters();
  const {
    data: platillos,
    loading: loadingPlatillos,
    error: errorPlatillos,
    fetchPlatillos,
  } = usePlatillos();

  const {
    data: order,
    loading: loadingOrder,
    error: errorOrder,
    saveOrder,
  } = useOrders();

  const [authState, setAuthState] = useState({
    selectedWaiter: null,
    isLoggedIn: false,
  });

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("BREAKFAST");
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda

  const [shoppingCart, setShoppingCart] = useState([]); // Estado para el carrito de compras
  const [showTablePopup, setShowTablePopup] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [popupHandlers, setPopupHandlers] = useState({
    selectTableHandler: () => {},
    closePopupHandler: () => {},
  });

  const {
    socketData,
    isConnected,
    error: errorSocket,
    connect,
    disconnect,
  } = useWebSocket(authState.selectedWaiter?.id, "waiter");

  // Verifica el estado de autenticación en localStorage cuando se monta el componente
  // Verificar autenticación en localStorage y manejar errores de parseo

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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
      return;
    }

    if (isConnected) {
      if (socketData) {
        console.log("Datos del WebSocket", socketData);
      }
    }
  }, [errorSocket, isConnected, socketData]);

  useEffect(() => {
    if (authState.isLoggedIn && authState.selectedWaiter && !isConnected) {
      if (!authState.selectedWaiter) {
        console.warn("Ningún mesero seleccionado para iniciar sesión");
        return;
      }
      connect(); // Conectar al WebSocket
      fetchPlatillos();
    }
  }, [authState.isLoggedIn, authState.selectedWaiter]);

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

  const handleSavePlatillo = (platillo, count) => {
    const platilloIndex = shoppingCart.findIndex(
      (item) => item.id === platillo.id
    );
    if (platilloIndex === -1) {
      setShoppingCart([...shoppingCart, { ...platillo, count }]);
    } else {
      const updatedCart = shoppingCart.map((item) => {
        if (item.id === platillo.id) {
          return { ...item, count: item.count + count };
        }
        return item;
      });
      setShoppingCart(updatedCart);
    }
  };

  const beforeExpand = () => {
    return new Promise((resolve, reject) => {
      setShowTablePopup(true);

      // Almacena las funciones de resolver/rechazar para usarlas en los eventos
      const selectTableHandler = (tableNumber) => {
        setSelectedTable(tableNumber);
        setShowTablePopup(false);
        resolve(tableNumber); // Resuelve la Promise con el número de mesa seleccionado
      };

      const closePopupHandler = () => {
        setShowTablePopup(false);
        reject(); // Rechaza la Promise si se cierra sin seleccionar
      };

      // Asignamos los handlers en el estado para accederlos en el popup
      setPopupHandlers({ selectTableHandler, closePopupHandler });
    });
  };

  const handleSendOrder = (clientName, onSucess) => {
    console.log("Enviando pedido...");

    if (platillos.length === 0) {
      Alert.error("Error", "No hay platillos en el pedido");
    } else {
      const details = shoppingCart.flatMap((platillo) =>
        Array.from({ length: platillo.count }, () => ({
          dish: { id: platillo.id },
        }))
      );

      saveOrder([
        {
          table_number: selectedTable,
          client_name: clientName,
          take_by: {
            id: authState.selectedWaiter.id,
          },
          details: details,
        },
      ])
        .then(() => {
          Alert.success(
            "Pedido enviado",
            "El pedido se ha enviado correctamente"
          );
          setShoppingCart([]); // Limpiar el carrito después de enviar el pedido
          setSelectedTable(null);
          if (typeof onSucess === "function") {
            onSucess();
          }
        })
        .catch(() => {
          Alert.error("Error", "No se pudo enviar el pedido");
        });
    }
  };

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
          socket={{
            isConnected,
            socketData,
            callback: () =>
              setNotification({ isVisible: true, message: "Nuevo pedido" }),
          }}
        />
        {authState.isLoggedIn ? (
          <>
            <CategoryPicker
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <MenuContainer
              platillos={platillos}
              loading={loadingPlatillos}
              error={errorPlatillos}
              selectedCategory={selectedCategory}
              isCliente={false}
              handleSavePlatillo={handleSavePlatillo}
            />
          </>
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
      <Helper icon={<HelperIcon />} view="waiter" />
      <Loader isLoading={loadingOrder} />
      <NotificationFloat
        isVisible={notification.isVisible}
        message={notification.message}
      />
      {isConnected && (
        <ShoppingCard
          platillos={shoppingCart}
          beforeExpand={beforeExpand}
          handleSendOrder={handleSendOrder}
        />
      )}
      <ModalTable isVisible={showTablePopup} handlers={popupHandlers} />
    </>
  );
};

export default WaiterPage;
