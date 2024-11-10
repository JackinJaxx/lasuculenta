import LogoLargeIcon from "@/assets/icons/LogoLargeIcon";
import "./header.css";
import PropTypes from "prop-types";
import LogoSmallIcon from "@/assets/icons/LogoSmallIcon";
import PerfilIcon from "@/assets/icons/PerfilIcon";
import { useEffect, useState } from "react";
import Notifications from "../Notifications/Notifications";

const HeaderComponent = ({
  minimized = false,
  user = { name: "", lastname: "" },
  onLogout = () => {},
  isProfile = true,
  minimizedProfile = false,
  socket = { isConnected: false, socketData: null, callback: () => {} },
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [newNotification, setNewNotification] = useState(false);

  useEffect(() => {
    if (socket.isConnected) {
      console.log("Conexión establecida");
      if (socket.socketData && !isProfile) {
        if (socket.socketData.action === "NEW_ORDER") {
          socket.callback();
        }
      } else if (socket.socketData && isProfile) {
        if (socket.socketData.action === "FINISH_ORDER") {
          console.log("Pedido finalizado");
          socket.callback(socket.socketData.message);
          setNewNotification(true);
        }
      }
    } else {
      console.log("Conexión cerrada");
    }
  }, [socket.isConnected, socket.socketData]);

  const resetNewNotification = () => {
    setNewNotification(false);
  };

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
                <Notifications
                  newNotification={newNotification}
                  resetNewNotification={resetNewNotification}
                  admin={user.name === ""}
                />
              </div>
            )}
            {!minimizedProfile && (
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
            )}
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
  onLogout: PropTypes.func,
  isProfile: PropTypes.bool,
  socket: PropTypes.shape({
    isConnected: PropTypes.bool,
    socketData: PropTypes.object,
    callback: PropTypes.func,
  }),
  minimizedProfile: PropTypes.bool,
};

export default HeaderComponent;
