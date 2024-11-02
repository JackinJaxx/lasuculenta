import PropTypes from "prop-types";
import "./counterControl.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const CounterControl = ({ onIncrement, onDecrement,onCountChange  }) => {
  const { register, setValue, watch } = useForm({
    defaultValues: { count: 1 },
  });

  const count = watch("count");

  const handleIncrement = () => {
    if (count < 99) {
      setValue("count", count + 1);
      onIncrement();
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setValue("count", count - 1);
      onDecrement();
    }
  };

   // Llama a `onCountChange` cada vez que cambia el valor del contador
   useEffect(() => {
    onCountChange(count);
  }, [count, onCountChange]);

  return (
    <div className="counter-control">
      <button className="counter-buttons" onClick={handleDecrement}>
        -
      </button>
      <input
        type="text"
        {...register("count", {
          required: true,
          validate: {
            isPositive: (value) => parseInt(value, 10) > 0,
            maxLimit: (value) => parseInt(value, 10) <= 99,
          },
          onChange: (e) => {
            let value = e.target.value;

            // Limita a dos dígitos y asegura que sea <= 99
            if (/^\d{0,2}$/.test(value) && parseInt(value, 10) <= 99) {
              setValue("count", value ? parseInt(value, 10) : 1);
            } else if (parseInt(value, 10) > 99) {
              setValue("count", 99);
            } else if (value === "") {
              setValue("count", 1);
            }
          },
        })}
      />
      <button className="counter-buttons" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

CounterControl.propTypes = {
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onCountChange: PropTypes.func.isRequired, // Añade el prop `onCountChange` como requerido
};

export default CounterControl;
