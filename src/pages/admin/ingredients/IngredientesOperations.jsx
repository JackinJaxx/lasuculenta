import SearchBar from "@/components/search/Search";
import TableIngredient from "../table/TableIngredientes";
import "./ingredientesOperations.css";
import { useEffect, useState } from "react";
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
  const [editModal, setEditModal] = useState(false);
  const { data, loading, errorIngrediente, addIngredient, updateIngredient } =
    useIngredient();

  const [refresh, setRefresh] = useState(false);

  const [ingrediente, setIngrediente] = useState({
    id: "",
    name: "",
    cost: "",
    unit: "",
    stock: "",
  });

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  const handleNotificationClose = () => {
    setNotification({ isVisible: false, message: "" });
  };

  const handleEdit = (ingredient) => {
    setEditModal(true);
    if (ingredient) {
      setIngrediente(ingredient);
      setEditModal(true);
    } else {
      setNotification({
        isVisible: true,
        message: "An error occurred while editing the ingredient.",
      });
    }
  };

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
    setNotification({
      isVisible: true,
      message: "You can add new ingredients and filter them by name or unit. ",
    });
  }, []);

  const handleSaveIngredient = () => {
    setRefresh(false);
    if (ingrediente.name && ingrediente.cost && ingrediente.unit) {
      //quitar stock
      const { stock, id, ...withOutStock } = ingrediente;

      // Usar el objeto sin stock
      addIngredient([withOutStock]);
    } else {
      setNotification({
        isVisible: true,
        message: "Please fill all the fields.",
      });
    }
  };

  const handleEditIngredient = () => {
    setRefresh(false);
    if (
      ingrediente.id &&
      ingrediente.name &&
      ingrediente.cost &&
      ingrediente.unit &&
      ingrediente.stock
    ) {
      //quitar stock
      updateIngredient([ingrediente])
        .then((response) => {
          const arr = response[0]
          
          if (arr?.success) {
            setEditModal(false);
            setNotification({
              isVisible: true,
              message: "Ingredient edited successfully.",
            });
            setRefresh(true);
            
          } else {
            setNotification({
              isVisible: true,
              message: "An error occurred while editing the ingredient.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setNotification({
            isVisible: true,
            message: "An error occurred while editing the ingredient.",
          });
        });
    } else {
      setNotification({
        isVisible: true,
        message: "Please fill all the fields.",
      });
    }
  };

  useEffect(() => {
    if (data?.length > 0) {
      const { success } = data[0];
      if (success) {
        setAltaModal(false);
        setIngrediente({ name: "", cost: "", unit: "" });
        setNotification({
          isVisible: true,
          message: "Ingredient added successfully.",
        });
        setRefresh(true);
      } else {
        setNotification({
          isVisible: true,
          message: "An error occurred while adding the ingredient.",
        });
      }
      return;
    }

    if (errorIngrediente) {
      setNotification({
        isVisible: true,
        message: "An error occurred while adding the ingredient.",
      });
    }
  }, [data, errorIngrediente]);

  return (
    <div className="ingredeint-operation">
      <NotificationFloat
        isVisible={notification.isVisible}
        message={notification.message}
        onClose={handleNotificationClose}
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
      <ModalAlta
        handlers={{
          closePopupHandler: () => setEditModal(false),
        }}
        isVisible={editModal}
        title={"Edit Ingredient"}
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
          <TextField
            label="Stock"
            variant="outlined"
            name="stock"
            value={ingrediente.stock}
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
        <button className="ingredient-save-btn" onClick={handleEditIngredient}>
          Edit
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
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default IngredientsOperations;
