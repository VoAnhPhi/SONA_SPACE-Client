// import { useState } from "react";

// type FilterProps = {
//   categories: string[];
//   rooms: string[];
//   prices: string[];
//   colors: string[];
//   onFilterChange: (filters: {
//     category?: string;
//     room?: string;
//     price?: string;
//     color?: string;
//   }) => void;
// };

// const Filter = ({
//   categories,
//   rooms,
//   prices,
//   colors,
//   onFilterChange,
// }: FilterProps) => {
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [isRoomOpen, setIsRoomOpen] = useState(false);
//   const [isPriceOpen, setIsPriceOpen] = useState(false);
//   const [isColorOpen, setIsColorOpen] = useState(false);

//   const [selectedCategory, setSelectedCategory] = useState("Chọn danh mục");
//   const [selectedRoom, setSelectedRoom] = useState("Chọn phòng");
//   const [selectedPrice, setSelectedPrice] = useState("Chọn giá");
//   const [selectedColor, setSelectedColor] = useState("Chọn màu");

//   const handleSelect = (type: string, value: string) => {
//     if (type === "category") {
//       setSelectedCategory(value);
//       setIsCategoryOpen(false);
//     }
//     if (type === "room") {
//       setSelectedRoom(value);
//       setIsRoomOpen(false);
//     }
//     if (type === "price") {
//       setSelectedPrice(value);
//       setIsPriceOpen(false);
//     }
//     if (type === "color") {
//       setSelectedColor(value);
//       setIsColorOpen(false);
//     }

//     // Truyền tất cả filters lên cha
//     onFilterChange({
//       category: type === "category" ? value : selectedCategory,
//       room: type === "room" ? value : selectedRoom,
//       price: type === "price" ? value : selectedPrice,
//       color: type === "color" ? value : selectedColor,
//     });
//   };

//   return (
//     <div className="container">
//       <div className="filter-row">
//         <div className="filter-left">
//           <div className="filter-icon">
//               <img src="/images/products/filter.svg" alt="Filter" />
//             <span>Bộ lọc:</span>
//           </div>
//           {/* Dropdown: Category */}
//           <div className="filter-dropdown">
//             <div
//               className="dropdown-toggle"
//               onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//             >
//               <span>{selectedCategory}</span>
//               <i
//                 className={`dropdown-icon ${isCategoryOpen ? "open" : ""}`}
//               ></i>
//             </div>
//             {isCategoryOpen && (
//               <div className="dropdown-menu">
//                 {categories.map((cat) => (
//                   <div
//                     key={cat}
//                     className={`dropdown-item ${
//                       selectedCategory === cat ? "selected" : ""
//                     }`}
//                     onClick={() => handleSelect("category", cat)}
//                   >
//                     {cat}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           {/* Dropdown: Room */}
//           <div className="filter-dropdown">
//             <div
//               className="dropdown-toggle"
//               onClick={() => setIsRoomOpen(!isRoomOpen)}
//             >
//               <span>{selectedRoom}</span>
//               <i className={`dropdown-icon ${isRoomOpen ? "open" : ""}`}></i>
//             </div>
//             {isRoomOpen && (
//               <div className="dropdown-menu">
//                 {rooms.map((room) => (
//                   <div
//                     key={room}
//                     className={`dropdown-item ${
//                       selectedRoom === room ? "selected" : ""
//                     }`}
//                     onClick={() => handleSelect("room", room)}
//                   >
//                     {room}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           {/* Dropdown: Price */}
//           <div className="filter-dropdown">
//             <div
//               className="dropdown-toggle"
//               onClick={() => setIsPriceOpen(!isPriceOpen)}
//             >
//               <span>{selectedPrice}</span>
//               <i className={`dropdown-icon ${isPriceOpen ? "open" : ""}`}></i>
//             </div>
//             {isPriceOpen && (
//               <div className="dropdown-menu">
//                 {prices.map((price) => (
//                   <div
//                     key={price}
//                     className={`dropdown-item ${
//                       selectedPrice === price ? "selected" : ""
//                     }`}
//                     onClick={() => handleSelect("price", price)}
//                   >
//                     {price}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           {/* Dropdown: Color */}
//           <div className="filter-dropdown">
//             <div
//               className="dropdown-toggle"
//               onClick={() => setIsColorOpen(!isColorOpen)}
//             >
//               <span>{selectedColor}</span>
//               <i className={`dropdown-icon ${isColorOpen ? "open" : ""}`}></i>
//             </div>
//             {isColorOpen && (
//               <div className="dropdown-menu">
//                 {colors.map((color) => (
//                   <div
//                     key={color}
//                     className={`dropdown-item ${
//                       selectedColor === color ? "selected" : ""
//                     }`}
//                     onClick={() => handleSelect("color", color)}
//                   >
//                     {color}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="filter-right">
//
//           <div className="filter-sort">
//             <button className="sort-toggle">
//                <img src="/images/products/arrow-down-up.svg" alt="Sort" />
//               <span>Sắp xếp</span>
//               <i className="dropdown-icon"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;
import { useState } from "react";

const Filter = () => {
  const categories = [
    { name: "Ghế", icon: "../../images/products/armchair.svg" },
    { name: "Bàn", icon: "../../images/products/table.svg" },
    { name: "Tủ", icon: "../../images/products/cabinet.svg" },
    { name: "Đèn", icon: "../../images/products/lamp.svg" },
  ];

  const rooms = ["Phòng khách", "Phòng ngủ", "Nhà bếp"];
  const prices = ["Dưới 1 triệu", "1 - 3 triệu", "Trên 3 triệu"];
  const colors = ["Trắng", "Đen", "Nâu", "Xám"];

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sắp xếp");

  const [selectedCategory, setSelectedCategory] = useState("Chọn danh mục");

  const [selectedRoom, setSelectedRoom] = useState("Chọn phòng");
  const [selectedPrice, setSelectedPrice] = useState("Chọn giá");
  const sortOptions = [
    "Giá tăng dần",
    "Giá giảm dần",
    "Mới nhất",
    "Giảm giá nhiều",
  ];
  const mapColorNameToHex = (color: string) => {
    switch (color.toLowerCase()) {
      case "trắng":
        return "#ffffff";
      case "đen":
        return "#000000";
      case "nâu":
        return "#8B4513";
      case "xám":
        return "#808080";
      default:
        return "#ccc";
    }
  };

  const [selectedColor, setSelectedColor] = useState("Chọn màu");

  const handleSelect = (type: string, value: string) => {
    if (type === "category") {
      setSelectedCategory(value);
      setIsCategoryOpen(false);
    }
    if (type === "room") {
      setSelectedRoom(value);
      setIsRoomOpen(false);
    }
    if (type === "price") {
      setSelectedPrice(value);
      setIsPriceOpen(false);
    }
    if (type === "color") {
      setSelectedColor(value);
      setIsColorOpen(false);
    }
    if (type === "sort") {
      setSelectedSort(value);
      setIsSortOpen(false);
      console.log("Sắp xếp theo:", value);
    }
  };
  const handleSortSelect = (value: string) => {
    setSelectedSort(value);
    setIsSortOpen(false);

    console.log("Sắp xếp theo:", value);
  };

  return (
    <div className="container">
      <div className="filter-row">
        <div className="filter-left">
          <div className="filter-icon">
            <img src="/images/products/filter.svg" alt="Filter" />
            <span>Bộ lọc:</span>
          </div>

          {/* Dropdown: Category */}
          <div className="filter-dropdown">
            <div
              className="dropdown-toggle"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              {/* Hiển thị icon của category đã chọn */}
              {selectedCategory !== "Chọn danh mục" && (
                <img
                  src={
                    categories.find((cat) => cat.name === selectedCategory)
                      ?.icon
                  }
                  alt={selectedCategory}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 8,
                    verticalAlign: "middle",
                  }}
                />
              )}
              <span>{selectedCategory}</span>
              <i
                className={`dropdown-icon ${isCategoryOpen ? "open" : ""}`}
              ></i>
            </div>
            {isCategoryOpen && (
              <div className="dropdown-menu">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className={`dropdown-item ${
                      selectedCategory === cat.name ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("category", cat.name)}
                  >
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      style={{
                        width: 24,
                        height: 24,
                        marginRight: 8,
                        verticalAlign: "middle",
                      }}
                    />
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown: Room */}
          <div className="filter-dropdown">
            <div
              className="dropdown-toggle"
              onClick={() => setIsRoomOpen(!isRoomOpen)}
            >
              <span>{selectedRoom}</span>
              <i className={`dropdown-icon ${isRoomOpen ? "open" : ""}`}></i>
            </div>
            {isRoomOpen && (
              <div className="dropdown-menu">
                {rooms.map((room) => (
                  <div
                    key={room}
                    className={`dropdown-item ${
                      selectedRoom === room ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("room", room)}
                  >
                    {room}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown: Price */}
          <div className="filter-dropdown">
            <div
              className="dropdown-toggle"
              onClick={() => setIsPriceOpen(!isPriceOpen)}
            >
              <span>{selectedPrice}</span>
              <i className={`dropdown-icon ${isPriceOpen ? "open" : ""}`}></i>
            </div>
            {isPriceOpen && (
              <div className="dropdown-menu">
                {prices.map((price) => (
                  <div
                    key={price}
                    className={`dropdown-item ${
                      selectedPrice === price ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("price", price)}
                  >
                    {price}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown: Color */}
          {/* Dropdown: Color */}
          <div className="filter-dropdown">
            <div
              className="dropdown-toggle"
              onClick={() => setIsColorOpen(!isColorOpen)}
            >
              {selectedColor !== "Chọn màu" && (
                <span
                  className="color-box"
                  style={{
                    backgroundColor: mapColorNameToHex(selectedColor),
                    marginRight: "8px",
                  }}
                ></span>
              )}
              <span>{selectedColor}</span>
              <i className={`dropdown-icon ${isColorOpen ? "open" : ""}`}></i>
            </div>

            {isColorOpen && (
              <div className="dropdown-menu">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`dropdown-item ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("color", color)}
                  >
                    <span
                      className="color-box"
                      style={{
                        backgroundColor: mapColorNameToHex(color),
                        marginRight: "8px",
                      }}
                    ></span>
                    {color}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="filter-right">
          <div className="filter-sort">
            <div
              className="sort-toggle"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <img src="/images/products/arrow-down-up.svg" alt="Sort" />
              <span>{selectedSort}</span>
              <i className={`dropdown-icon ${isSortOpen ? "open" : ""}`}></i>
            </div>

            {isSortOpen && (
              <div className="dropdown-menu">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-item ${
                      selectedSort === option ? "selected" : ""
                    }`}
                    onClick={() => handleSortSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
