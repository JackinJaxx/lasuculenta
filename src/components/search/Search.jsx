import SearchIcon from "@/assets/icons/SearchIcon";
import "./search.css";
import PropTypes from "prop-types";

const SearchBar = ({ placeholder = "Busqueda", onChange }) => {
  return (
    <div className="search-container">
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        onChange={onChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchBar;
