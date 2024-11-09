import LogoLargeIcon from "@/assets/icons/LogoLargeIcon";
import "./header.css";
import PropTypes from "prop-types";
import LogoSmallIcon from "@/assets/icons/LogoSmallIcon";
import PerfilIcon from "@/assets/icons/PerfilIcon";
import { useEffect, useState } from "react";
import Notifications from "../Notifications/Notifications";

const HeaderComponent = ({
  minimized = false,
  user,
  onLogout,
  isProfile = true,
  socket,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    console.log("User changed", user);
  }, [user, minimized]);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    try {
      if (onLogout) {
        onLogout();
      } else {
        console.warn("No se ha proporcionado una función de cierre de sesión");
      }
    } catch (error) {
      console.error("Error al intentar cerrar sesión:", error);
    }
  };

  return (
    <header className={`${minimized ? "small" : ""}`}>
      {minimized ? (
        <>
          <LogoSmallIcon />
          <div className="header-options">
            <p>
              {user.name} {user.lastname}
            </p>
            {isProfile && (
              <div className="notification">
                <Notifications socket={socket} />
              </div>
            )}
            <div className="profile" onClick={toggleMenu}>
              <PerfilIcon />
              {showMenu && (
                <div className="profile-menu">
                  <ul>
                    <li onClick={handleLogout}>Cerrar sesión</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <LogoLargeIcon />
      )}
    </header>
  );
};

HeaderComponent.propTypes = {
  minimized: PropTypes.bool,
  user: PropTypes.object,
  onLogout: PropTypes.func, // Función opcional para manejar el cierre de sesión
  isProfile: PropTypes.bool,
  socket: PropTypes.shape({
    isConnected: PropTypes.bool,
    socketData: PropTypes.object,
  }),
};

export default HeaderComponent;
