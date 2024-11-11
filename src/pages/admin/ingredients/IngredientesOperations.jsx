import SearchBar from "@/components/search/Search";
import TableIngredient from "../table/TableIngredientes";
import "./ingredientesOperations.css";
import { useState } from "react";

const IngredientsOperations = () => {
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  
  return (
    <div className="ingredeint-operation">
      <p>Operations</p>
      <div
        className="admin-predictions"
        style={{ justifyContent: "space-between" }}
      >
        <button className="ingredient-save-btn">New Ingredient</button>
        <SearchBar placeholder={"Busqueda"} onChange={handleSearchChange} />
      </div>
      <div className="admin-table">
        <TableIngredient />
      </div>
    </div>
  );
};

export default IngredientsOperations;
