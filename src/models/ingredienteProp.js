import PropTypes from 'prop-types';

export const ingredienteProp = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    cost: PropTypes.number,
    stock: PropTypes.number,
    unit: PropTypes.string,
});