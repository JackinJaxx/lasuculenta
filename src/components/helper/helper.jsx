import "./helper.css";
import PropTypes from "prop-types";

const Helper = ({ icon, view, aligment = "left", onAdminAction }) => {
  // Define los enlaces externos según la vista
  const getRedirectLink = () => {
    switch (view) {
      case "waiter":
        return "https://drive.usercontent.google.com/u/2/uc?id=1230Mv2yghZv8tElm7DpluY7_irYFLG6D&export=download";
      case "kitchener":
        return "https://drive.usercontent.google.com/u/2/uc?id=1_LVChvUQvxSvdByq9ManuSxAf0B0b9HM&export=download";
      case "customer":
        return "https://drive.usercontent.google.com/u/2/uc?id=1Sn4aS8Mi1a6q-y5WV6211hDlp1lrpFAH&export=download";
      default:
        return "https://default.example.com";
    }
  };

  // Maneja el clic y redirige al enlace externo
  const handleRedirect = () => {
    if (view === "admin" && onAdminAction) {
      onAdminAction(); // Ejecuta el callback si es vista "admin"
    } else {
      const link = getRedirectLink();
      window.location.href = link;
    }
  };

  return (
    <div
      className={`helper-card ${
        aligment === "right" ? "align-right" : "align-left"
      }`}
      onClick={handleRedirect}
    >
      {icon}
    </div>
  );
};

Helper.propTypes = {
  icon: PropTypes.elementType,
  view: PropTypes.string,
  aligment: PropTypes.string,
  onAdminAction: PropTypes.func,
};

export default Helper;
