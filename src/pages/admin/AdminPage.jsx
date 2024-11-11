import HeaderComponent from "@/components/header/Header";
import "./adminPage.css";
import AdminPicker from "@/components/pickerAdmin/PickerAdmin";
import { useState } from "react";
import TableIngredient from "./table/TableIngredientes";
import TableDishes from "./table/TableDishes";
import TableWaiters from "./table/TableWaiter";
import TableKitchener from "./table/TableKitchener";
import TableOrders from "./table/TableOrders";
import OperationsIcon from "@/assets/icons/OperationsIcon";
import ReportsIcon from "@/assets/icons/ReportsIcon";
import IAIcon from "@/assets/icons/IAIcon";
import { TextField } from "@mui/material";
import PredictionIcon from "@/assets/icons/predictIcon";
import Alert from "@/components/alert/AlertCustom";
import TablePrediction from "./table/TablePrediction";
import PredictionComponent from "./prediction/PredictionComponent";
import Helper from "@/components/helper/helper";

const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState({
    first: "INGREDIENTS",
    second: "OPERATIONS",
  });

 

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

  // Define las opciones del Picker secundario basadas en la selección del primero
  const getSecondaryOptions = () => {
    if (selectedOption.first === "INGREDIENTS") {
      return [
        { value: "OPERATIONS", label: "Operations", icon: OperationsIcon },
        { value: "REPORTS", label: "Reports", icon: ReportsIcon },
        { value: "PREDICTIONS", label: "Predictions", icon: IAIcon },
      ];
    }
    // Opciones secundarias predeterminadas para otras selecciones
    return [
      { value: "OPERATIONS", label: "Operations", icon: OperationsIcon },
      { value: "REPORTS", label: "Reports", icon: ReportsIcon },
    ];
  };

  const renderContent = () => {
    const { first, second } = selectedOption;

    if (first === "INGREDIENTS" && second === "OPERATIONS") {
      return (
        <div className="ingredeint-operation">
          <div>OPERACIONES</div>
          <div className="admin-table">
            <TableIngredient />
          </div>
        </div>
      );
    }

    if (first === "INGREDIENTS" && second === "PREDICTIONS") {
      return (
        <PredictionComponent />
      );
    }

    if (first === "DISHES" && second === "OPERATIONS") {
      return (
        <div className="ingredeint-operation">
          <div>OPERACIONES</div>
          <div className="admin-table">
            <TableDishes />
          </div>
        </div>
      );
    }

    if (first === "WAITERS" && second === "OPERATIONS") {
      return (
        <div className="ingredeint-operation">
          <div>OPERACIONES</div>
          <div className="admin-table">
            <TableWaiters />
          </div>
        </div>
      );
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
        <Helper icon={<IAIcon/>} view="admin" aligment="right" />
      </div>
    </>
  );
};

export default AdminPage;
