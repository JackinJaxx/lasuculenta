import { useEffect, useState } from "react";
import "./WaitersOperations.css";
import usePlatillos from "@/hooks/PlatillosService";
import NotificationFloat from "@/components/Notifications/NotificationFloat";
import Loader from "@/components/spinner/Spinner";
import ModalAlta from "@/components/modal/modalAlta";
import { TextField } from "@mui/material";
import SearchBar from "@/components/search/Search";
import TableDishes from "../table/TableDishes";
import useIngredient from "@/hooks/IngredientService";
import TableWaiters from "../table/TableWaiter";
import useWaiters from "@/hooks/WaiterService";

const WaitersOperations = () => {
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda
  const [altaModal, setAltaModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { data, loading, error, saveWaiter } = useWaiters();

  const [refresh, setRefresh] = useState(false);

  const [markup, setMarkup] = useState(0); // Estado para la ganancia

  const handleMarkupChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setMarkup(value);
  };

  const [waiter, setWaiter] = useState({
    id: "",
    name: "",
    lastname: "",
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
    setWaiter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setNotification({
      isVisible: true,
      message: "You can add a new waiter.",
    });
  }, []);

  const handleSaveIngredient = () => {
    setRefresh(false);

    if (waiter.name && waiter.lastname) {
      saveWaiter([waiter]);
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
        setWaiter({
          id: "",
          name: "",
          lastname: "",
        });

        setNotification({
          isVisible: true,
          message: "Waiter added successfully.",
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
            setWaiter({
              id: "",
              name: "",
              lastname: "",
            });
            setMarkup(0);
          },
        }}
        isVisible={altaModal}
        title={"New Waiter"}
      >
        <div className="columns">
          <div className="form-alta dish-form">
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              value={waiter.name}
              onChange={(e) => handleChange(e)}
              style={{ width: "200px" }}
            />
            <TextField
              label="Lastname"
              name="lastname"
              variant="outlined"
              value={waiter.lastname}
              onChange={(e) => handleChange(e)}
              style={{ width: "200px" }}
            />
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
          New Waiter
        </button>
        <SearchBar placeholder={"Search"} onChange={handleSearchChange} />
      </div>
      <div className="admin-table">
        <TableWaiters
          searchText={searchText}
          refresh={refresh}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default WaitersOperations;
