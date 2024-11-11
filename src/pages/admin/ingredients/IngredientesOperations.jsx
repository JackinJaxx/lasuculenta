import SearchBar from "@/components/search/Search";
import TableIngredient from "../table/TableIngredientes";
import "./ingredientesOperations.css";
import { useEffect, useRef, useState } from "react";
import NotificationFloat from "@/components/Notifications/NotificationFloat";
import ModalAlta from "@/components/modal/modalAlta";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useIngredient from "@/hooks/IngredientService";
import Loader from "@/components/spinner/Spinner";

const IngredientsOperations = () => {
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [altaModal, setAltaModal] = useState(false);
  const {
    data,
    loading,
    error: errorIngrediente,
    addIngredient,
  } = useIngredient();
  const [error, setError] = useState("");

  const [refresh, setRefresh] = useState(false);

  const [ingrediente, setIngrediente] = useState({
    name: "",
    cost: "",
    unit: "",
  });

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngrediente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUnitChange = (event) => {
    setIngrediente((prev) => ({
      ...prev,
      unit: event.target.value,
    }));
  };

  useEffect(() => {
    if (!notification.isVisible) {
      setNotification({
        isVisible: true,
        message: "You can add new ingredients and filter them by name or unit.",
      });
    }
  }, [notification.isVisible]);

  const handleSaveIngredient = () => {
    setRefresh(false);
    setNotification({
      isVisible: false,
      message: "",
    });
    if (ingrediente.name && ingrediente.cost && ingrediente.unit) {
      console.log("dasdas");
      addIngredient([ingrediente]);
    } else {
      setError("An error occurred while adding the ingredient.");
    }

  };

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        console.log("pene", data);
        if (data[0].success === true) {
          setAltaModal(false);
          setIngrediente({ name: "", cost: "", unit: "" });
          setNotification({
            isVisible: true,
            message: "Ingredient added successfully.",
          });
          setRefresh(true);
          return;
        }
        console.log("dasdasdasdasdadasda");
        setNotification({
          isVisible: true,
          message: "An error occurred while adding the ingredient.",
        });
      }
    }
  }, [data]);

  return (
    <div className="ingredeint-operation">
      <NotificationFloat
        isVisible={notification.isVisible}
        message={notification.message}
      />
      <Loader isLoading={loading} />
      <ModalAlta
        handlers={{
          closePopupHandler: () => setAltaModal(false),
        }}
        isVisible={altaModal}
        title={"New Ingredient"}
      >
        <div className="form-alta">
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={ingrediente.name}
            onChange={handleChange}
          />
          <TextField
            label="Cost"
            variant="outlined"
            name="cost"
            value={ingrediente.cost}
            onChange={handleChange}
          />
          <FormControl variant="outlined" style={{ width: "200px" }}>
            <InputLabel>Unit</InputLabel>
            <Select
              value={ingrediente.unit}
              onChange={handleUnitChange}
              label="Unit"
            >
              <MenuItem value="LITERS">Liters</MenuItem>
              <MenuItem value="MILLILITERS">Milliliters</MenuItem>
              <MenuItem value="KILOS">Kilos</MenuItem>
              <MenuItem value="GRAMS">Grams</MenuItem>
              <MenuItem value="POUNDS">Pounds</MenuItem>
              <MenuItem value="OUNCES">Ounces</MenuItem>
            </Select>
          </FormControl>
        </div>
        <button className="ingredient-save-btn" onClick={handleSaveIngredient}>
          Save
        </button>
      </ModalAlta>
      <p>Operations</p>
      <div
        className="admin-predictions"
        style={{ justifyContent: "space-between" }}
      >
        <button
          className="ingredient-save-btn"
          onClick={() => setAltaModal(true)}
        >
          New Ingredient
        </button>
        <SearchBar placeholder={"Search"} onChange={handleSearchChange} />
      </div>
      <div className="admin-table">
        <TableIngredient
          searchText={searchText}
          refresh={refresh}
        />
      </div>
    </div>
  );
};

export default IngredientsOperations;
