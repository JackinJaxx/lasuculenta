import { platilloProp } from "@/models/platilloProp";
import "./cardPlatillo.css";
import CounterControl from "@/components/counterControl/CounterControl";
import { useState } from "react";
import PropTypes from "prop-types";
import NextIcon from "@/assets/icons/NextIcon";

const CardPlatillo = ({ platillo, isCliente = true, handleSavePlatillo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(0);

  const handleCountChange = (newCount) => {
    setCount(newCount);
  };

  const onClickSavePlatillo = () => {
    handleSavePlatillo(platillo, count);
    setCount(0);
  };

  return (
    <div className="card-platillo">
      <div
        className="img-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={platillo.icon} alt={platillo.name} />
        {isHovered && !isCliente && (
          <div className="overlay-content">
            <div className="counter-container">
              <CounterControl
                onIncrement={() => {}}
                onDecrement={() => {}}
                onCountChange={handleCountChange}
              />
            </div>
            <button className="next-icon" onClick={onClickSavePlatillo}>
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
  handleSavePlatillo: PropTypes.func,
};

export default CardPlatillo;
