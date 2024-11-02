import PropTypes from "prop-types";
export const platilloProp = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  sell_price: PropTypes.number,
  real_cost: PropTypes.number,
  //un map de ingrededientes con cantidad
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      quantity: PropTypes.number,
    })
  ),
  img: PropTypes.string,
  category: PropTypes.string,
});
