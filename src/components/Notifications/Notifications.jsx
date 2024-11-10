import { useEffect, useState } from "react";
import "./notifications.css";
import PropTypes from "prop-types";
import useOrders from "@/hooks/OrderService";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import Alert from "../alert/AlertCustom";

const Notifications = ({ newNotification, resetNewNotification }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const { loading, error, getOrdersReady, takeDelivery } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Cambiar a ID específico

  const [ordersReadys, setOrdersReadys] = useState([]);

  // Actualiza las notificaciones al montar el componente y cada minuto
  useEffect(() => {
    const fetchNotifications = () => {
      console.log("Fetching notifications...");
      getOrdersReady()
        .then((newNotifications) => {
          setNotificationCount(newNotifications.length);
          setOrdersReadys(newNotifications);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    };

    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Escucha los cambios de `newNotification`
  useEffect(() => {
    if (newNotification) {
      console.log("New notification received");
      getOrdersReady()
        .then((newNotifications) => {
          setNotificationCount(newNotifications.length);
          setOrdersReadys(newNotifications);
          resetNewNotification();
        })
        .catch((error) =>
          console.error("Error fetching notifications:", error)
        );
    }
  }, [newNotification, getOrdersReady, resetNewNotification]);

  const toggleMenu = () => {
    if (notificationCount > 0) {
      setShowMenu((prev) => !prev);
    }
  };

  const toggleExpand = (orderId) => {
    // Cambiar el estado solo si el ID es diferente, para alternar entre expandido y colapsado
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const handleDelivery = (order) => {
    const platillos = order.details.map((detail) => {
      return {
        order: {
          id: order.id,
        },
        cns: detail.cns,
      };
    });

    takeDelivery(platillos)
      .then(() => {
        getOrdersReady()
          .then((newNotifications) => {
            console.log("Notifications fetched:", newNotifications);
            setNotificationCount(newNotifications.length);
            setOrdersReadys(newNotifications);
            Alert.success("Success", "Delivery confirmed");
          })
          .catch((error) => {
            Alert.error("Error", "Error confirming delivery " + error);
          });
      })
      .catch(() => {
        Alert.error("Error", "Error confirming delivery");
      });
  };

  return (
    <div className="notification-icon">
      <div onClick={toggleMenu}>
        {/* Icono de notificación */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <mask
            id="mask0_161_9"
            maskUnits="userSpaceOnUse"
            x="5"
            y="5"
            width="70"
            height="70"
          >
            <path d="M5 5H75V75H5V5Z" fill="white" />
          </mask>
          <g mask="url(#mask0_161_9)">
            <path
              d="M74.1358 34.7975V51.6667C74.1267 57.8522 71.6654 63.7819 67.2915 68.1557C62.9177 72.5296 56.988 74.9909 50.8025 75H28.3333C22.1478 74.9909 16.2181 72.5296 11.8443 68.1557C7.47041 63.7819 5.00914 57.8522 5 51.6667V29.1975C5.00914 23.012 7.47041 17.0823 11.8443 12.7085C16.2181 8.3346 22.1478 5.87334 28.3333 5.8642H45.1679C45.8555 5.8642 46.5149 6.13734 47.0011 6.62355C47.4874 7.10975 47.7605 7.76919 47.7605 8.45679C47.7605 9.14439 47.4874 9.80382 47.0011 10.29C46.5149 10.7762 45.8555 11.0494 45.1679 11.0494H28.3333C23.5201 11.0494 18.9041 12.9614 15.5007 16.3649C12.0972 19.7683 10.1852 24.3843 10.1852 29.1975V37.8395H18.8272C21.3484 37.8395 23.7663 38.841 25.549 40.6238C27.3318 42.4066 28.3333 44.8245 28.3333 47.3457C28.3333 48.4917 28.7886 49.5907 29.5989 50.4011C30.4093 51.2114 31.5083 51.6667 32.6543 51.6667H46.4815C47.6247 51.6576 48.7185 51.1995 49.5269 50.3911C50.3353 49.5827 50.7934 48.4889 50.8025 47.3457C50.7933 46.0947 51.0329 44.8545 51.5073 43.697C51.9818 42.5395 52.6817 41.4879 53.5663 40.6033C54.4508 39.7187 55.5024 39.0189 56.6599 38.5444C57.8174 38.0699 59.0577 37.8303 60.3086 37.8395H68.9506V34.7975C68.9506 34.1099 69.2238 33.4505 69.71 32.9643C70.1962 32.4781 70.8556 32.2049 71.5432 32.2049C72.2308 32.2049 72.8903 32.4781 73.3764 32.9643C73.8627 33.4505 74.1358 34.1099 74.1358 34.7975Z"
              fill="#C4753D"
            />
            <path
              d="M63.7653 27.4691C66.7449 27.4691 69.6025 26.2855 71.7094 24.1786C73.8163 22.0717 74.9999 19.2142 74.9999 16.2346C74.9999 13.255 73.8163 10.3974 71.7094 8.29053C69.6025 6.18364 66.7449 5 63.7653 5C60.7857 5 57.9282 6.18364 55.8213 8.29053C53.7144 10.3974 52.5308 13.255 52.5308 16.2346C52.5308 19.2142 53.7144 22.0717 55.8213 24.1786C57.9282 26.2855 60.7857 27.4691 63.7653 27.4691Z"
              fill={notificationCount > 0 ? "#4b2e2e" : "#C4753D"}
            />
          </g>
          {notificationCount > 0 && (
            <text
              x={notificationCount > 9 ? "56" : "60"}
              y="21"
              fontSize="14"
              fill="#f0e5cf"
              fontWeight="bold"
            >
              {notificationCount}
            </text>
          )}
        </svg>
      </div>

      {showMenu && notificationCount > 0 && (
        <div className="notifications-menu">
          <div className="notifications-menu-secondary">
            {loading ? (
              <LoadingIcon />
            ) : (
              <>
                {ordersReadys.map((order) => (
                  <div
                    key={order.id}
                    className="notification-item-content"
                    onClick={() => toggleExpand(order.id)}
                  >
                    <div className="notification-item-table">
                      <div className="notification-item-table-number">
                        <p>{order.table_number}</p>
                      </div>
                    </div>
                    <div className="notification-item-body">
                      <p>The order for customer {order.client_name} is ready</p>
                      {expandedOrderId === order.id && (
                        <button onClick={() => handleDelivery(order)}>
                          Confirm delivery
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Notifications.propTypes = {
  newNotification: PropTypes.bool,
  resetNewNotification: PropTypes.func.isRequired,
};
export default Notifications;
