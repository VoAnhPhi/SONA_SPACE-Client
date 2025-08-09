import { useEffect, useRef, useState, useCallback } from "react";
import { convertToAdminApiUrl } from "../../utils/url";

interface FilterProps {
  onFilterChange: (filters: {
    category?: string;
    room?: string;
    price?: string;
    color?: string;
    sort?: string;
    roomSlug?: string;
  }) => void;
  hideRoomFilter?: boolean;
  colorMode?: "name" | "hex";
  hideCategoryFilter?: boolean;
  roomSlugMode?: boolean;
}

const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  hideRoomFilter = false,
  colorMode = "name",
  hideCategoryFilter = false,
  roomSlugMode = false,
}) => {
  const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Chọn danh mục");
  const [selectedRoom, setSelectedRoom] = useState<string>("Chọn phòng");
  const [selectedPrice, setSelectedPrice] = useState<string>("Chọn giá");
  const [selectedColor, setSelectedColor] = useState<string>("Chọn màu");
  const [selectedSort, setSelectedSort] = useState<string>("Sắp xếp");
  const [currentFilters, setCurrentFilters] = useState<{
    [key: string]: string;
  }>({});

  const prices = ["Dưới 10 triệu", "10 - 30 triệu", "Trên 30 triệu"];
  const sortOptions = ["Giá tăng dần", "Giá giảm dần", "Mới nhất", "Giảm giá"];

  const [categories, setCategories] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  const filterRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleDropdown = (type: string) => {
    setOpenedDropdown((prev) => (prev === type ? null : type));
  };

  // Debounce function để tránh gọi API quá nhiều
  const debouncedFilterChange = useCallback(
    (filters: { [key: string]: string }) => {
      // Clear timeout cũ nếu có
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set timeout mới để delay việc gọi onFilterChange
      debounceTimeoutRef.current = setTimeout(() => {
        onFilterChange(filters);
      }, 300);
    },
    [onFilterChange]
  );

  const handleSelect = (type: string, value: string) => {
    let newFilters = { ...currentFilters };

    switch (type) {
      case "category":
        setSelectedCategory(value);
        if (value !== "Chọn danh mục") {
          newFilters.category = value;
        } else {
          delete newFilters.category;
        }
        break;
      case "room":
        setSelectedRoom(value);
        if (value !== "Chọn phòng") {
          if (roomSlugMode) {
            const chosen = rooms.find((r) => r.room_name === value);
            if (chosen?.slug) {
              newFilters.roomSlug = chosen.slug;
              delete newFilters.room;
            }
          } else {
            newFilters.room = value;
            delete newFilters.roomSlug;
          }
        } else {
          delete newFilters.room;
          delete newFilters.roomSlug;
        }
        break;
      case "price":
        setSelectedPrice(value);
        if (value !== "Chọn giá") {
          newFilters.price = value;
        } else {
          delete newFilters.price;
        }
        break;
      case "color":
        setSelectedColor(value);
        if (value !== "Chọn màu") {
          const chosen = colors.find((c) => c.color_name === value);
          newFilters.color =
            colorMode === "hex" ? chosen?.color_hex ?? "" : value;
        } else {
          delete newFilters.color;
        }
        break;
      case "sort":
        setSelectedSort(value);
        if (value !== "Sắp xếp") {
          newFilters.sort = value;
        } else {
          delete newFilters.sort;
        }
        break;
    }

    setOpenedDropdown(null);
    setCurrentFilters(newFilters);
    debouncedFilterChange(newFilters);
  };

  const handleClear = (type: string) => {
    let newFilters = { ...currentFilters };

    switch (type) {
      case "category":
        setSelectedCategory("Chọn danh mục");
        delete newFilters.category;
        break;
      case "room":
        setSelectedRoom("Chọn phòng");
        delete newFilters.room;
        delete newFilters.roomSlug;
        break;
      case "price":
        setSelectedPrice("Chọn giá");
        delete newFilters.price;
        break;
      case "color":
        setSelectedColor("Chọn màu");
        delete newFilters.color;
        break;
      case "sort":
        setSelectedSort("Sắp xếp");
        delete newFilters.sort;
        break;
    }

    setOpenedDropdown(null);
    setCurrentFilters(newFilters);
    debouncedFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedCategory("Chọn danh mục");
    setSelectedRoom("Chọn phòng");
    setSelectedPrice("Chọn giá");
    setSelectedColor("Chọn màu");
    setSelectedSort("Sắp xếp");
    setOpenedDropdown(null);
    setCurrentFilters({});
    onFilterChange({});
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, roomRes, colorRes] = await Promise.all([
          fetch(convertToAdminApiUrl("/categories/filter/")).then((res) =>
            res.json()
          ),
          fetch(convertToAdminApiUrl("/rooms/filter/")).then((res) =>
            res.json()
          ),
          fetch(convertToAdminApiUrl("/color/filter/")).then((res) =>
            res.json()
          ),
        ]);

        setCategories(catRes);
        setRooms(roomRes);
        setColors(colorRes);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bộ lọc:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpenedDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Cleanup debounce timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="container" ref={filterRef}>
      <div className="filter-row">
        <div className="filter-left">
          <div className="filter-icon">
            <img src="/images/products/filter.svg" alt="Filter" />
            <span>Bộ lọc:</span>
          </div>

          {/* Category */}
          {!hideCategoryFilter && (
            <div className="filter-dropdown">
              <div
                className="dropdown-toggle"
                onClick={() => toggleDropdown("category")}
              >
                {selectedCategory !== "Chọn danh mục" && (
                  <img
                    src={
                      categories.find(
                        (cat) => cat.category_name === selectedCategory
                      )?.category_icon
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
                <span className="label">{selectedCategory}</span>
                <i
                  className={`dropdown-icon ${
                    openedDropdown === "category" ? "open" : ""
                  }`}
                />
              </div>
              <div
                className={`dropdown-menu ${
                  openedDropdown === "category" ? "show" : ""
                }`}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.category_id}
                    className={`dropdown-item ${
                      selectedCategory === cat.category_name ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("category", cat.category_name)}
                  >
                    <img
                      src={cat.category_icon}
                      alt={cat.category_name}
                      style={{ width: 24, height: 24, marginRight: 8 }}
                    />

                    {cat.category_name}
                  </div>
                ))}

                <div
                  className="dropdown-item clear-item"
                  onClick={() => handleClear("category")}
                >
                  Xoá bộ lọc
                </div>
              </div>
            </div>
          )}

          {/* Room */}
          {!hideRoomFilter && (
            <div className="filter-dropdown">
              <div
                className="dropdown-toggle"
                onClick={() => toggleDropdown("room")}
              >
                <span className="label">{selectedRoom}</span>
                <i
                  className={`dropdown-icon ${
                    openedDropdown === "room" ? "open" : ""
                  }`}
                />
              </div>
              <div
                className={`dropdown-menu ${
                  openedDropdown === "room" ? "show" : ""
                }`}
              >
                {rooms.map((room) => (
                  <div
                    key={room.room_id}
                    className={`dropdown-item ${
                      selectedRoom === room.room_name ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("room", room.room_name)}
                  >
                    {room.room_name}
                  </div>
                ))}

                <div
                  className="dropdown-item clear-item"
                  onClick={() => handleClear("room")}
                >
                  Xoá bộ lọc
                </div>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="filter-dropdown">
            <div
              className="dropdown-toggle"
              onClick={() => toggleDropdown("price")}
            >
              <span>{selectedPrice}</span>
              <i
                className={`dropdown-icon ${
                  openedDropdown === "price" ? "open" : ""
                }`}
              />
            </div>
            <div
              className={`dropdown-menu ${
                openedDropdown === "price" ? "show" : ""
              }`}
            >
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

              <div
                className="dropdown-item clear-item"
                onClick={() => handleClear("price")}
              >
                Xoá bộ lọc
              </div>
            </div>
          </div>

          {/* Color */}
          <div className="filter-dropdown">
            <div
              className="dropdown-toggle"
              onClick={() => toggleDropdown("color")}
            >
              {selectedColor !== "Chọn màu" && (
                <span
                  className="color-box"
                  style={{
                    backgroundColor:
                      colors.find((color) => color.color_name === selectedColor)
                        ?.color_hex || "#ccc",
                    marginRight: 8,
                  }}
                ></span>
              )}

              <span className="label">{selectedColor}</span>
              <i
                className={`dropdown-icon ${
                  openedDropdown === "color" ? "open" : ""
                }`}
              />
            </div>
            <div
              className={`dropdown-menu ${
                openedDropdown === "color" ? "show" : ""
              }`}
            >
              {colors.map((color) => (
                <div
                  key={color.color_id}
                  className={`dropdown-item ${
                    selectedColor === color.color_name ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("color", color.color_name)}
                >
                  <span
                    className="color-box"
                    style={{
                      backgroundColor: color.color_hex,
                      marginRight: 8,
                    }}
                  ></span>
                  {color.color_name}
                </div>
              ))}

              <div
                className="dropdown-item clear-item"
                onClick={() => handleClear("color")}
              >
                Xoá bộ lọc
              </div>
            </div>
          </div>
        </div>

        {/* Sort */}
        <div className="filter-right">
          <div className="filter-sort">
            <div className="sort-toggle" onClick={() => toggleDropdown("sort")}>
              <img src="/images/products/arrow-down-up.svg" alt="Sort" />
              <span>{selectedSort}</span>
              <i
                className={`dropdown-icon ${
                  openedDropdown === "sort" ? "open" : ""
                }`}
              />
            </div>
            <div
              className={`dropdown-menu ${
                openedDropdown === "sort" ? "show" : ""
              }`}
            >
              {sortOptions.map((option) => (
                <div
                  key={option}
                  className={`dropdown-item ${
                    selectedSort === option ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("sort", option)}
                >
                  {option}
                </div>
              ))}

              <div
                className="dropdown-item clear-item"
                onClick={() => handleClear("sort")}
              >
                Xoá bộ lọc
              </div>
            </div>
          </div>
          <div className="filter-clear-all">
            <button className="clear-all-btn" onClick={clearAllFilters}>
              Xoá tất cả bộ lọc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
