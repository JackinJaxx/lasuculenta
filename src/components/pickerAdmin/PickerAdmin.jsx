// components/CategoryPicker.js
import PropTypes from "prop-types";
import BebidasCalientesIcon from "@/assets/icons/BebidasCalientesIcon";
import BebidasFriasIcon from "@/assets/icons/BebidasFriasIcon";
import DesayunosIcon from "@/assets/icons/DesayunosIcon";
import PasteleriaIcon from "@/assets/icons/PasteleriaIcon";
import Picker from "@/components/picker/Picker";
import WaiterIcon from "@/assets/icons/WaiterIcon";
import KitchenerIcon from "@/assets/icons/KitchenerIcon";

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
    {value: "ORDERS", label: "Orders", icon: PasteleriaIcon},
  ];

  return (
    <Picker
      onChange={(category) => onCategoryChange(category.value)}
      options={options}
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
