// components/CategoryPicker.js
import PropTypes from "prop-types";
import BebidasCalientesIcon from "@/assets/icons/BebidasCalientesIcon";
import BebidasFriasIcon from "@/assets/icons/BebidasFriasIcon";
import DesayunosIcon from "@/assets/icons/DesayunosIcon";
import PasteleriaIcon from "@/assets/icons/PasteleriaIcon";
import Picker from "@/components/picker/Picker";

const CategoryPicker = ({ selectedCategory, onCategoryChange }) => {
  const options = [
    { value: 0, label: "Bebidas Calientes", icon: BebidasCalientesIcon },
    { value: 1, label: "Bebidas Frías", icon: BebidasFriasIcon },
    { value: 2, label: "Desayunos", icon: DesayunosIcon },
    { value: 3, label: "Pastelería y Panadería", icon: PasteleriaIcon },
  ];

  return (
    <Picker
      onChange={(category) => onCategoryChange(category.label)}
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
