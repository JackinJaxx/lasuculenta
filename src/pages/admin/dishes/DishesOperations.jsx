import { useEffect, useState } from "react";
import "./dishesOperations.css";
import usePlatillos from "@/hooks/PlatillosService";
import NotificationFloat from "@/components/Notifications/NotificationFloat";
import Loader from "@/components/spinner/Spinner";
import ModalAlta from "@/components/modal/modalAlta";
import { TextField } from "@mui/material";
import SearchBar from "@/components/search/Search";
import TableDishes from "../table/TableDishes";

const DishesOperations = () => {
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [altaModal, setAltaModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { data, loading, error, addIngredient, updateIngredient, saveDish } =
    usePlatillos();

  const [refresh, setRefresh] = useState(false);

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
      dish.category &&
      dish.icon &&
      dish.recipe.length > 0 &&
      !dish.id
    ) {
      //quitar stock
      const { id, ...withOutId } = dish;

      // Usar el objeto sin stock
      saveDish([withOutId]);
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
          name: "",
          sell_price: "",
          recipe: [],
          category: "",
          icon: "",
          id: "",
        });
        setNotification({
          isVisible: true,
          message: "Dish added successfully.",
        });
        setRefresh(true);
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
        title={"New Dish"}
      >
        <div className="form-alta">
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={dish.name}
            onChange={handleChange}
          />
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
        title={"Edit Dish"}
      >
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
