import HeaderComponent from "@/components/header/Header";
import "./customer.css";
import { useEffect, useState } from "react";
import usePlatillos from "@/hooks/PlatillosService";
import CategoryPicker from "@/components/categoryPicker/CategoryPicker";
import MenuContainer from "@/components/menuContainer/MenuContainer";

const CustomerPage = () => {
  const { data: platillos, loading, error, fetchPlatillos } = usePlatillos(); // Usa el hook para obtener platillos
  const [selectedCategory, setSelectedCategory] = useState("BREAKFAST");

  useEffect(() => {
    fetchPlatillos(); // Obtiene la lista de platillos
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="customer-page">
      <HeaderComponent />
      <CategoryPicker
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <MenuContainer
        platillos={platillos}
        loading={loading}
        error={error}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default CustomerPage;
