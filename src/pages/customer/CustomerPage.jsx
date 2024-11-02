import CardPlatillo from "@/components/cards/cardPlatillo/CardPlatillo";
import HeaderComponent from "@/components/header/Header";
import Picker from "@/components/picker/Picker";
import "./customer.css";
import { useEffect, useState } from "react";
import usePlatillos from "@/services/PlatillosService";
import BebidasCalientesIcon from "@/assets/icons/BebidasCalientesIcon";
import BebidasFriasIcon from "@/assets/icons/BebidasFriasIcon";
import { motion, AnimatePresence } from "framer-motion";
import DesayunosIcon from "@/assets/icons/DesayunosIcon";
import PasteleriaIcon from "@/assets/icons/PasteleriaIcon";

const CustomerPage = () => {
  const { data: platillos, loading, error, fetchPlatillos } = usePlatillos(); // Usa el hook para obtener platillos
  const [filteredPlatillos, setFilteredPlatillos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Desayunos");

  useEffect(() => {
    fetchPlatillos(); // Obtiene la lista de platillos
  }, []);

  useEffect(() => {
    // Filtra los platillos según la categoría seleccionada
    if (selectedCategory) {
      setFilteredPlatillos(
        platillos.filter((platillo) => platillo.category === selectedCategory)
      );
    } else {
      setFilteredPlatillos(platillos);
    }
  }, [platillos, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.label);
  };

  return (
    <div className="customer-page">
      <HeaderComponent />
      <Picker
        onChange={handleCategoryChange}
        options={[
          { value: 0, label: "Bebidas Calientes", icon: BebidasCalientesIcon },
          { value: 1, label: "Bebidas Frías", icon: BebidasFriasIcon },
          { value: 2, label: "Desayunos", icon: DesayunosIcon },
          { value: 3, label: "Pastelería y Panadería", icon: PasteleriaIcon },
        ]}
      />
      <div className="menu">
        <div className="container-menu">
          <AnimatePresence mode="wait">
            <motion.div
              className="cards"
              key={selectedCategory}
              initial={{ x: 300, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  duration: 0.5,
                  bounce: 0.3,
                },
              }}
              exit={{
                x: -300,
                opacity: 0,
                transition: { duration: 0.2 }, // Transición más rápida y sin rebote
              }}
            >
              {loading && <p>Cargando platillos...</p>}
              {error && <p>Error al cargar platillos: {error.message}</p>}
              {platillos.length === 0 && !loading && !error && (
                <p style={{ color: "black" }}>No hay platillos disponibles</p>
              )}
              {filteredPlatillos.map((platillo) => (
                <CardPlatillo key={platillo.id} platillo={platillo} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
