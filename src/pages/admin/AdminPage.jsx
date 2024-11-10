import HeaderComponent from "@/components/header/Header";
import "./adminPage.css";
import AdminPicker from "@/components/pickerAdmin/PickerAdmin";
import { useState } from "react";

const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState({
    first: "WARM_DRINK",
    second: "COLD_DRINK",
  });

  const handleSelectedOption = (category) => {
    setSelectedOption(category);
  };

  return (
    <>
      <div className="waiter-page">
        <HeaderComponent minimized={true} minimizedProfile={true} />
        <AdminPicker
          selectedCategory={selectedOption.first}
          onCategoryChange={handleSelectedOption}
        />
      </div>
    </>
  );
};
export default AdminPage;
