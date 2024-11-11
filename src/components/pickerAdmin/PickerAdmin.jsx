import PropTypes from "prop-types";
import Picker from "@/components/picker/Picker";
import PasteleriaIcon from "@/assets/icons/PasteleriaIcon";
import DesayunosIcon from "@/assets/icons/DesayunosIcon";
import WaiterIcon from "@/assets/icons/WaiterIcon";
import KitchenerIcon from "@/assets/icons/KitchenerIcon";
import OrdersIcon from "@/assets/icons/OrdersIcon";
import OperationsIcon from "@/assets/icons/OperationsIcon";
import ReportsIcon from "@/assets/icons/ReportsIcon";
import IAIcon from "@/assets/icons/IAIcon";

const AdminPicker = ({
  selectedCategory,
  onCategoryChange,
  secondary = false,
  options,
}) => {
  const primaryOptions = [
    { value: "INGREDIENTS", label: "Ingredients", icon: PasteleriaIcon },
    { value: "DISHES", label: "Dishes", icon: DesayunosIcon },
    { value: "WAITERS", label: "Waiters", icon: WaiterIcon },
    { value: "KITCHENER", label: "Kitchener", icon: KitchenerIcon },
    { value: "ORDERS", label: "Orders", icon: OrdersIcon },
  ];

  // Usa las opciones que se pasan como prop para el Picker secundario
  const pickerOptions = secondary ? options : primaryOptions;

  return (
    <Picker
      onChange={(category) => onCategoryChange(category.value)}
      options={pickerOptions}
      selectedOption={selectedCategory}
    />
  );
};

AdminPicker.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  secondary: PropTypes.bool,
  options: PropTypes.array, // Se asegura que las opciones se pasen al Picker
};

export default AdminPicker;
