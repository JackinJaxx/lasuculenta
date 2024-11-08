// components/MenuContainer.js
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardPlatillo from "@/components/cards/cardPlatillo/CardPlatillo";
import { motion, AnimatePresence } from "framer-motion";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import ErrorIcon from "@/assets/icons/ErrorIcon";

const MenuContainer = ({ platillos, loading, error, selectedCategory }) => {
  const [filteredPlatillos, setFilteredPlatillos] = useState([]);

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

  return (
    <div className="menu-container">
      {loading && <LoadingIcon />}
      {error && (
        <div className="error-msg">
          <ErrorIcon />
          <p>Error al cargar platillos: {error.message}</p>
        </div>
      )}
      {!loading && !error && filteredPlatillos.length === 0 && (
        <p style={{ color: "black" }}>No hay platillos disponibles</p>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          className="cards"
          key={selectedCategory}
          initial={{ x: 300, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 },
          }}
          exit={{
            x: -300,
            opacity: 0,
            transition: { duration: 0.2 },
          }}
        >
          {filteredPlatillos.map((platillo) => (
            <CardPlatillo key={platillo.id} platillo={platillo} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

MenuContainer.propTypes = {
  platillos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  selectedCategory: PropTypes.string.isRequired,
};

export default MenuContainer;
