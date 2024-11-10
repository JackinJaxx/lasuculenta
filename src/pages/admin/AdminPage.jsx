import HeaderComponent from "@/components/header/Header";
import "./adminPage.css";
import AdminPicker from "@/components/pickerAdmin/PickerAdmin";
import { useState } from "react";

const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState({
    first: "INGREDIENTS",
    second: "OPERATIONS",
  });

  const handleSelectedOption = (category) => {
    //ACA se modifica first
    setSelectedOption({ ...selectedOption, first: category });
  };

  const handleSelectedSecondOption = (category) => {
    setSelectedOption({ ...selectedOption, second: category });
  };

  return (
    <>
      <div className="waiter-page">
        <HeaderComponent minimized={true} minimizedProfile={true} />
        <AdminPicker
          selectedCategory={selectedOption.first}
          onCategoryChange={handleSelectedOption}
        />
        <div className="admin-page">
          <div className="admin-container">
            <div className="admin-picker-secondary">
              <AdminPicker
                secondary={true}
                selectedCategory={selectedOption.second}
                onCategoryChange={handleSelectedSecondOption}
              />
            </div>
            <div className="admin-content">
            <div>

            </div>
            <div>
              
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminPage;
