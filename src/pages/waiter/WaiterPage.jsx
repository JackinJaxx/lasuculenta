import { useEffect, useState } from "react";
import HeaderComponent from "@/components/header/Header";
import "./waiter.css";
import useWaiters from "@/services/WaiterService";

const WaiterPage = () => {
  const { data: waiters, loading, error, fetchWaiters } = useWaiters();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [waiterInfo, setWaiterInfo] = useState(null);

  // Verifica el estado de autenticación en localStorage cuando se monta el componente
  useEffect(() => {
    const waiterData = localStorage.getItem("loggedWaiter");
    if (waiterData) {
      setWaiterInfo(JSON.parse(waiterData));
      setIsLoggedIn(true);
    } else {
      fetchWaiters();
    }
  }, []);

  // Función para iniciar sesión del mesero (simulado con datos ficticios)
  const handleLogin = () => {
    const waiter = { id: "123", name: "John", lastname: "Doe" };
    localStorage.setItem("loggedWaiter", JSON.stringify(waiter));
    setWaiterInfo(waiter);
    setIsLoggedIn(true);
  };

  // Función para cerrar sesión del mesero
  const handleLogout = () => {
    localStorage.removeItem("loggedWaiter");
    setWaiterInfo(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="waiter-page">
      <HeaderComponent />
      <div className="menu">
        {isLoggedIn ? (
          <div></div>
        ) : (
          <div className="login-container">
            <p>Selecciona tu perfil</p>
            <div className="login-items">
              <input type="text" placeholder="Search" />
              {waiters.map((waiter) => (
                <div key={waiter.id} className="waiter-card">
                  <p>{waiter.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaiterPage;
