import PropTypes from "prop-types";

const NextIcon = ({ color = "#F0E5CF" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="40" fill="none">
      <path
        d="M54.663 22.155H15.337a2.164 2.164 0 0 1-2.185-2.185c0-1.224.962-2.185 2.185-2.185h39.326c1.223 0 2.185.961 2.185 2.185a2.164 2.164 0 0 1-2.185 2.185Z"
        fill={color}
      />
      <path
        d="M43.74 37.448a2.054 2.054 0 0 1-1.53-.656 2.163 2.163 0 0 1 0-3.102l13.764-13.764L42.21 6.162a2.163 2.163 0 0 1 0-3.102 2.163 2.163 0 0 1 3.102 0l15.294 15.293a2.163 2.163 0 0 1 0 3.102L45.311 36.75a2.195 2.195 0 0 1-1.53.655l-.043.044Z"
        fill={color}
      />
    </svg>
  );
};

NextIcon.propTypes = {
  color: PropTypes.string,
};


export default NextIcon;
