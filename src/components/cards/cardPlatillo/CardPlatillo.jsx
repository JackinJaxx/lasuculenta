import { platilloProp } from "@/models/platilloProp";
import "./cardPlatillo.css";
import CounterControl from "@/components/counterControl/CounterControl";
import NextIcon from "@/assets/icons/nextIcon";
import { useState } from "react";
import PropTypes from "prop-types";

const CardPlatillo = ({ platillo, isCliente = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(0);

  const handleCountChange = (newCount) => {
    setCount(newCount);
  };

  return (
    <div className="card-platillo">
      <div
        className="img-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={platillo.img} alt={platillo.name} />
        {isHovered && !isCliente && (
          <div className="overlay-content">
            <div className="counter-container">
              <CounterControl
                onIncrement={() => {}}
                onDecrement={() => {}}
                onCountChange={handleCountChange}
              />
            </div>
            <button className="next-icon">
              <NextIcon />
            </button>
          </div>
        )}
      </div>
      <div className="info-container">
        <p>{platillo.name}</p>
        <p>${platillo.sell_price}</p>
      </div>
    </div>
  );
};

CardPlatillo.propTypes = {
  platillo: platilloProp,
  isCliente: PropTypes.bool,
};

export default CardPlatillo;
