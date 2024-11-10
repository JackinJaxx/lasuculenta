// components/CategoryPicker.js
import PropTypes from "prop-types";
import BebidasCalientesIcon from "@/assets/icons/BebidasCalientesIcon";
import BebidasFriasIcon from "@/assets/icons/BebidasFriasIcon";
import DesayunosIcon from "@/assets/icons/DesayunosIcon";
import PasteleriaIcon from "@/assets/icons/PasteleriaIcon";
import Picker from "@/components/picker/Picker";
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
}) => {
  const options = [
    { value: "INGREDIENTS", label: "Ingredients", icon: PasteleriaIcon },
    { value: "DISHES", label: "Dishes", icon: DesayunosIcon },
    { value: "WAITERS", label: "Waiters", icon: WaiterIcon },
    { value: "KITCHENER", label: "Kitchener", icon: KitchenerIcon },
    { value: "ORDERS", label: "Orders", icon: OrdersIcon },
  ];

  const secondaryOptions = [
    { value: "OPERATIONS", label: "Operations", icon: OperationsIcon },
    { value: "REPORTS", label: "Reports", icon: ReportsIcon },
    { value: "PREDICTIONS", label: "Predictions", icon: IAIcon },
  ];

  return (
    <Picker
      onChange={(category) => onCategoryChange(category.value)}
      options={secondary ? secondaryOptions : options}
      selectedOption={selectedCategory}
    />
  );
};

AdminPicker.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  secondary: PropTypes.bool,
};

export default AdminPicker;
