// components/CategoryPicker.js
import PropTypes from "prop-types";
import BebidasCalientesIcon from "@/assets/icons/BebidasCalientesIcon";
import BebidasFriasIcon from "@/assets/icons/BebidasFriasIcon";
import DesayunosIcon from "@/assets/icons/DesayunosIcon";
import PasteleriaIcon from "@/assets/icons/PasteleriaIcon";
import Picker from "@/components/picker/Picker";

const CategoryPicker = ({ selectedCategory, onCategoryChange }) => {
  const options = [
    { value: "WARM_DRINK", label: "Warm Drink", icon: BebidasCalientesIcon },
    { value: "COLD_DRINK", label: "Cold Drink", icon: BebidasFriasIcon },
    { value: "BREAKFAST", label: "Breakfast", icon: DesayunosIcon },
    { value: "DESSERT", label: "Dessert", icon: PasteleriaIcon },
  ];

  return (
    <Picker
      onChange={(category) => onCategoryChange(category.value)}
      options={options}
      selectedOption={selectedCategory}
    />
  );
};

CategoryPicker.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryPicker;
