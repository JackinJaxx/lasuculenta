import PropTypes from "prop-types";
import "./picker.css";

const Picker = ({ options, onChange, selectedOption }) => {
  return (
    <div className="picker">
      {options.map((option) => (
        <button
          key={option.value}
          className={`picker-button ${selectedOption === option.value ? "selected" : ""}`}
          onClick={() => onChange(option)}
        >
          <div className="icon">{option.icon && <option.icon />}</div>
          <p>{option.label}</p>
        </button>
      ))}
    </div>
  );
};

Picker.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    })
  ).isRequired,
  selectedOption: PropTypes.string.isRequired,
};

export default Picker;
