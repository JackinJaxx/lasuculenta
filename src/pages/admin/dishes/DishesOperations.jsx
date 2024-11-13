import { useEffect, useState } from "react";
import "./dishesOperations.css";
import usePlatillos from "@/hooks/PlatillosService";
import NotificationFloat from "@/components/Notifications/NotificationFloat";
import Loader from "@/components/spinner/Spinner";
import ModalAlta from "@/components/modal/modalAlta";
import {
  Button,
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import SearchBar from "@/components/search/Search";
import TableDishes from "../table/TableDishes";
import useIngredient from "@/hooks/IngredientService";

const DishesOperations = () => {
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [altaModal, setAltaModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { data, loading, error, addIngredient, updateIngredient, saveDish } =
    usePlatillos();

  const {
    data: dataIngredients,
    loading: loadingIngredients,
    error: errorIngredients,
    fetchIngredients,
  } = useIngredient();

  const [refresh, setRefresh] = useState(false);

  const [markup, setMarkup] = useState(0); // Estado para la ganancia

  const handleMarkupChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setMarkup(value);
  };

  const [dish, setDish] = useState({
    id: "",
    name: "",
    sell_price: "",
    recipe: [],
    category: "",
    icon: "",
  });

  const [notification, setNotification] = useState({
    isVisible: false,
    message: "",
  });

  useEffect(() => {
    if (altaModal) {
      fetchIngredients(); // Obtener ingredientes al abrir el modal
    }
  }, [altaModal]);

  const handleNotificationClose = () => {
    setNotification({ isVisible: false, message: "" });
  };

  const handleEdit = (ingredient) => {
    setEditModal(true);
    if (ingredient) {
      // setIngrediente(ingredient);
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
    setDish((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setNotification({
      isVisible: true,
      message: "You can add new dishes or edit existing ones.",
    });
  }, []);

  const handleSaveIngredient = () => {
    setRefresh(false);

    if (
      dish.name &&
      dish.sell_price &&
      dish.recipe.length > 0 &&
      dish.category &&
      dish.icon
    ) {
      // Transformar el formato de `recipe`
      const formattedRecipe = dish.recipe.map((item) => ({
        quantity: item.quantity,
        ingredient: {
          id: item.id,
        },
      }));

      // Crear el objeto de `dish` con el `recipe` formateado
      const dishData = {
        name: dish.name,
        sell_price: parseFloat(dish.sell_price) + markup,
        category: dish.category,
        icon: dish.icon,
        recipe: formattedRecipe,
      };

      saveDish([dishData]);
    } else {
      setNotification({
        isVisible: true,
        message: "Please fill all the fields.",
      });
    }
  };

  const handleEditIngredient = () => {
    // setRefresh(false);
    // if (
    //   ingrediente.id &&
    //   ingrediente.name &&
    //   ingrediente.cost &&
    //   ingrediente.unit &&
    //   ingrediente.stock
    // ) {
    //   //quitar stock
    //   updateIngredient([ingrediente])
    //     .then((response) => {
    //       const arr = response[0];
    //       if (arr?.success) {
    //         setEditModal(false);
    //         setNotification({
    //           isVisible: true,
    //           message: "Ingredient edited successfully.",
    //         });
    //         setRefresh(true);
    //       } else {
    //         setNotification({
    //           isVisible: true,
    //           message: "An error occurred while editing the ingredient.",
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       setNotification({
    //         isVisible: true,
    //         message: "An error occurred while editing the ingredient.",
    //       });
    //     });
    // } else {
    //   setNotification({
    //     isVisible: true,
    //     message: "Please fill all the fields.",
    //   });
    // }
  };

  useEffect(() => {
    if (data?.length > 0) {
      const { success } = data[0];
      if (success) {
        setAltaModal(false);
        setDish({
          id: "",
          name: "",
          sell_price: "",
          recipe: [],
          category: "",
          icon: "",
        });
        setNotification({
          isVisible: true,
          message: "Dish added successfully.",
        });
        setRefresh(true);
        setAltaModal(false);
      } else {
        setNotification({
          isVisible: true,
          message: "An error occurred while adding the dish.",
        });
      }
      return;
    }

    if (error) {
      setNotification({
        isVisible: true,
        message: "An error occurred while adding the dish.",
      });
    }
  }, [data, error]);

  const handleIngredientToggle = (ingredient, quantity) => {
    const isSelected = dish.recipe.some((item) => item.id === ingredient.id);
    const updatedRecipe = isSelected
      ? dish.recipe.filter((item) => item.id !== ingredient.id)
      : [...dish.recipe, { ...ingredient, quantity }];

    const ingredientTotalCost = updatedRecipe.reduce(
      (total, item) => total + item.cost * item.quantity,
      0
    );
    const newSellPrice = Math.max(0, ingredientTotalCost + markup);

    setDish((prev) => ({
      ...prev,
      recipe: updatedRecipe,
      sell_price: newSellPrice.toFixed(2),
    }));
  };

  const handleQuantityChange = (ingredientId, quantity) => {
    const updatedRecipe = dish.recipe.map((item) =>
      item.id === ingredientId ? { ...item, quantity } : item
    );

    const ingredientTotalCost = updatedRecipe.reduce(
      (total, item) => total + item.cost * item.quantity,
      0
    );
    const newSellPrice = Math.max(0, ingredientTotalCost + markup);

    setDish((prev) => ({
      ...prev,
      recipe: updatedRecipe,
      sell_price: newSellPrice.toFixed(2),
    }));
  };

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
          closePopupHandler: () => {
            setAltaModal(false);
            setDish({
              id: "",
              name: "",
              sell_price: "",
              recipe: [],
              category: "",
              icon: "",
            });
            setMarkup(0);
          },
        }}
        isVisible={altaModal}
        title={"New Dish"}
      >
        <div className="columns">
          <div className="form-alta dish-form">
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              value={dish.name}
              onChange={(e) => handleChange(e)}
              style={{ width: "200px" }}
            />
            <FormControl variant="outlined" style={{ width: "200px" }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={dish.category}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="COLD_DRINK">Cold Drink</MenuItem>
                <MenuItem value="WARM_DRINK">Warm Drink</MenuItem>
                <MenuItem value="BREAKFAST">Breakfast</MenuItem>
                <MenuItem value="DESSERT">Dessert</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ width: "200px" }}>
              <InputLabel>Markup</InputLabel>
              <OutlinedInput
                name="markup"
                value={markup}
                onChange={handleMarkupChange}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Markup"
              />
            </FormControl>

            <FormControl style={{ width: "200px" }}>
              <InputLabel>Sell Price</InputLabel>
              <OutlinedInput
                name="sell_price"
                value={dish.sell_price}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Sell Price"
                disabled
              />
            </FormControl>

            <TextField
              label="Image Link"
              name="icon"
              variant="outlined"
              value={dish.icon}
              onChange={(e) => handleChange(e)}
              style={{ width: "200px" }}
            />
          </div>

          {/* Lista de ingredientes disponibles */}
          <div className="ingredients-list">
            <h3>Available Ingredients</h3>
            <List dense>
              {dataIngredients?.map((ingredient) => (
                <ListItem key={ingredient.id} button>
                  <Checkbox
                    checked={dish.recipe.some(
                      (item) => item.id === ingredient.id
                    )}
                    onClick={() => handleIngredientToggle(ingredient, 1)} // Inicializa con una cantidad de 1
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText
                    primary={`${ingredient.name} ($${ingredient.cost} per ${ingredient.unit})`}
                  />
                  <TextField
                    label="Quantity"
                    type="number"
                    defaultValue={1}
                    inputProps={{ min: 1, step: 0.1 }}
                    onChange={(e) =>
                      handleQuantityChange(
                        ingredient.id,
                        parseFloat(e.target.value) || 1
                      )
                    }
                    style={{ width: "160px" }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <button className="ingredient-save-btn" onClick={handleSaveIngredient}>
          Save
        </button>
      </ModalAlta>
      {/* <ModalAlta
        handlers={{
          closePopupHandler: () => setEditModal(false),
        }}
        isVisible={editModal}
        title={"Edit Dish"}
      >
        <button className="ingredient-save-btn" onClick={handleEditIngredient}>
          Edit
        </button>
      </ModalAlta> */}
      <p>Operations</p>
      <div
        className="admin-predictions"
        style={{ justifyContent: "space-between" }}
      >
        <button
          className="ingredient-save-btn"
          onClick={() => setAltaModal(true)}
        >
          New Dish
        </button>
        <SearchBar placeholder={"Search"} onChange={handleSearchChange} />
      </div>
      <div className="admin-table">
        <TableDishes
          searchText={searchText}
          refresh={refresh}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default DishesOperations;
