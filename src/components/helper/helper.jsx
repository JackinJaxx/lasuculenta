import HelperIcon from "@/assets/icons/HelperIcon";
import "./helper.css";
import PropTypes from "prop-types";

const Helper = ({ icon, view, aligment = left }) => {
  return <div className={`helper-card`}>{icon}</div>;
};

Helper.propTypes = {
  icon: PropTypes.elementType,
  view: PropTypes.string,
  aligment: PropTypes.string,
};

export default Helper;
