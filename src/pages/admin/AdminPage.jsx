import HeaderComponent from "@/components/header/Header";
import "./adminPage.css";
import AdminPicker from "@/components/pickerAdmin/PickerAdmin";
import { useEffect, useState } from "react";
import TableDishes from "./table/TableDishes";
import TableWaiters from "./table/TableWaiter";
import TableKitchener from "./table/TableKitchener";
import TableOrders from "./table/TableOrders";
import OperationsIcon from "@/assets/icons/OperationsIcon";
import ReportsIcon from "@/assets/icons/ReportsIcon";
import IAIcon from "@/assets/icons/IAIcon";
import PredictionComponent from "./prediction/PredictionComponent";
import Helper from "@/components/helper/helper";
import IngredientsOperations from "./ingredients/IngredientesOperations";
import NotificationFloat from "@/components/Notifications/NotificationFloat";
import useWebSocket from "@/hooks/useWebSocket";
import HelperIcon from "@/assets/icons/HelperIcon";
import DishesOperations from "./dishes/DishesOperations";
import DishesReports from "./dishes/DishesReports";
import WaitersOperations from "./waiters/WaitersOperations";
import WaitersReports from "./waiters/WaitersReports";

const generateAndStoreUID = () => {
  // Genera un UID de forma manual
  const uid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  localStorage.setItem("adminID", uid); // Guarda el UID en localStorage
  return uid;
};

const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState({
    first: "INGREDIENTS",
    second: "OPERATIONS",
  });

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const [authState, setAuthState] = useState({
    adminID: localStorage.getItem("adminID") || generateAndStoreUID(),
    isLoggedIn: true, // El admin está automáticamente autenticado
  });

  const {
    socketData,
    isConnected,
    error: errorSocket,
    connect,
    disconnect,
  } = useWebSocket(authState.adminID, "admin");

  const handleNotificationClose = () => {
    setNotification({ isVisible: false, message: "" });
  };

  useEffect(() => {
    if (!isConnected) {
      connect();
    }

    // Desconectar al desmontar el componente para evitar conexiones no deseadas
    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  }, [isConnected]);

  useEffect(() => {
    if (errorSocket) {
      console.error("Error en el WebSocket:", errorSocket);
      disconnect(); // Desconectar si hay error en WebSocket
    } else if (isConnected) {
      console.log("WebSocket conectado:");
    }

    if (socketData && socketData.action === "NEW_PREDICTION") {
      const ingredientsList = socketData.message.join(", "); // Une los nombres con comas
      setNotification({
        isVisible: true,
        message: `These ingredients are urgently needed: ${ingredientsList}`,
      });
    }
  }, [errorSocket, isConnected, socketData]);

  // Define las opciones del Picker secundario basadas en la selección del primero
  const getSecondaryOptions = () => {
    if (selectedOption.first === "INGREDIENTS") {
      return [
        { value: "OPERATIONS", label: "Operations", icon: OperationsIcon },
        { value: "PREDICTIONS", label: "Predictions", icon: IAIcon },
      ];
    }

    // Opciones secundarias predeterminadas para otras selecciones
    return [
      { value: "OPERATIONS", label: "Operations", icon: OperationsIcon },
      { value: "REPORTS", label: "Reports", icon: ReportsIcon },
    ];
  };

  const handleSelectedOption = (category) => {
    setSelectedOption({
      ...selectedOption,
      first: category,
      second: "OPERATIONS",
    });
  };

  const handleSelectedSecondOption = (category) => {
    setSelectedOption({ ...selectedOption, second: category });
  };

  const renderContent = () => {
    const { first, second } = selectedOption;

    if (first === "INGREDIENTS" && second === "OPERATIONS") {
      return <IngredientsOperations />;
    }

    if (first === "INGREDIENTS" && second === "PREDICTIONS") {
      return <PredictionComponent />;
    }

    if (first === "DISHES" && second === "OPERATIONS") {
      return <DishesOperations />;
    }

    if (first === "DISHES" && second === "REPORTS") {
      return <DishesReports />;
    }

    if (first === "WAITERS" && second === "OPERATIONS") {
      return <WaitersOperations />;
    }

    if (first === "WAITERS" && second === "REPORTS") {
      return <WaitersReports />;
    }

    if (first === "KITCHENER" && second === "OPERATIONS") {
      return (
        <div className="ingredeint-operation">
          <div>OPERACIONES</div>
          <div className="admin-table">
            <TableKitchener />
          </div>
        </div>
      );
    }

    if (first === "ORDERS" && second === "OPERATIONS") {
      return (
        <div className="ingredeint-operation">
          <div>OPERACIONES</div>
          <div className="admin-table">
            <TableOrders />
          </div>
        </div>
      );
    }

    // Puedes seguir añadiendo condicionales para cada combinación de `first` y `second`
    return <div>Por favor selecciona una opción válida</div>;
  };

  return (
    <>
      <div className="waiter-page">
        <HeaderComponent minimized={true} minimizedProfile={true} />
        <AdminPicker
          selectedCategory={selectedOption.first}
          onCategoryChange={handleSelectedOption}
        />
        <div className="admin-page">
          <div className="admin-container">
            <div className="admin-picker-secondary">
              <AdminPicker
                secondary={true}
                selectedCategory={selectedOption.second}
                onCategoryChange={handleSelectedSecondOption}
                options={getSecondaryOptions()} // Pasa las opciones dinámicas aquí
              />
            </div>
            <div className="admin-content">{renderContent()}</div>
          </div>
        </div>
        <Helper
          icon=<IAIcon />
          view="admin"
          aligment="right"
          onAdminAction={() =>
            setSelectedOption({ first: "INGREDIENTS", second: "PREDICTIONS" })
          }
        />
        <Helper icon={<HelperIcon />} view="admi" />
        <NotificationFloat
          isVisible={notification.isVisible}
          message={notification.message}
          onClose={handleNotificationClose}
        />
      </div>
    </>
  );
};

export default AdminPage;
