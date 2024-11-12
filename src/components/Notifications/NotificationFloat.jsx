import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./notificationFloat.css";
const NotificationFloat = ({
  isVisible,
  message = "¡Do you have a new notification!",
  onClose = () => {},
}) => {
  const [visible, setVisible] = useState(isVisible);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      // Aplicar la clase de entrada después de una breve demora para asegurar que el componente esté montado
      setTimeout(() => setAnimationClass("slide-in"), 10);

      // Cerrar automáticamente después de 3 segundos
      const timer = setTimeout(() => {
        setAnimationClass("slide-out");
        onClose();
      }, 3000);

      // Limpia el temporizador al desmontar o si isVisible cambia
      return () => clearTimeout(timer);
    } else {
      setAnimationClass("slide-out");
    }
  }, [isVisible]);

  const handleClose = () => {
    setAnimationClass("slide-out"); // Activa la animación de salida
    onClose(); // Notifica al padre para que actualice `isVisible`
  };

  const handleAnimationEnd = () => {
    if (animationClass === "slide-out") {
      setVisible(false); // Oculta el componente después de la animación de salida
    }
  };

  return (
    visible && (
      <div
        className={`notification-float ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="notification-close" onClick={() => handleClose()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            />
          </svg>
        </div>
        <div className="notification-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9.5a.5.5 0 0 0 0-1H6a1 1 0 0 1-1-1h10a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2zm4.75 3.75a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m-.25 6.75a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 1 0z"
            />
          </svg>
        </div>
        <div className="notification-content">
          <p>{message}</p>
        </div>
      </div>
    )
  );
};

NotificationFloat.propTypes = {
  isVisible: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default NotificationFloat;
