// components/MenuContainer.js
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardPlatillo from "@/components/cards/cardPlatillo/CardPlatillo";
import { motion, AnimatePresence } from "framer-motion";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import ErrorIcon from "@/assets/icons/ErrorIcon";

const MenuContainer = ({
  platillos,
  loading,
  error,
  selectedCategory,
  isCliente = true,
  handleSavePlatillo,
}) => {
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
            {loading ? (
              <LoadingIcon />
            ) : (
              filteredPlatillos.map((platillo) => (
                <CardPlatillo
                  key={platillo.id}
                  platillo={platillo}
                  isCliente={isCliente}
                  handleSavePlatillo={handleSavePlatillo}
                />
              ))
            )}
            {error && (
              <div className="error-msg">
                <ErrorIcon />
                <p>Ha ocurrido un error al cargar los platillos</p>
              </div>
            )}
            {platillos.length === 0 && !loading && !error && (
              <p style={{ color: "black" }}>No hay platillos disponibles</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

MenuContainer.propTypes = {
  platillos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  selectedCategory: PropTypes.string.isRequired,
  isCliente: PropTypes.bool,
  handleSavePlatillo: PropTypes.func,
};

export default MenuContainer;
