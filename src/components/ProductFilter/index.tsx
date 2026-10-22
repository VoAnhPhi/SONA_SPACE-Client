import { useEffect, useRef, useState, useCallback } from "react";
import { http } from "@/shared/api/http";

type FilterValues = {
  category?: string;
  room?: string;
  price?: string;
  color?: string;
  sort?: string;
  roomSlug?: string;
};

const EMPTY_FILTERS: FilterValues = {};

interface FilterProps {
  onFilterChange: (filters: FilterValues) => void;
  initialFilters?: FilterValues;
  hideRoomFilter?: boolean;
  colorMode?: "name" | "hex";
  hideCategoryFilter?: boolean;
  roomSlugMode?: boolean;
}

type GroupKey = "category" | "room" | "price" | "color";
type Selected = Partial<Record<GroupKey | "sort", string>>;

const PRICES = ["Dưới 10 triệu", "10 - 30 triệu", "Trên 30 triệu"];
const SORT_OPTIONS = ["Giá tăng dần", "Giá giảm dần", "Mới nhất", "Giảm giá"];
const GROUP_LABEL: Record<"room" | "price" | "color", string> = {
  room: "Phòng",
  price: "Giá",
  color: "Màu",
};

// Category chips on the first line; room, price, color and sort on the second. On phones the
// second line collapses into one "Bộ lọc" button that opens a bottom sheet.
const CloseIcon = () => (
  <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
  </svg>
);

const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  initialFilters = EMPTY_FILTERS,
  hideRoomFilter = false,
  colorMode = "name",
  hideCategoryFilter = false,
  roomSlugMode = false,
}) => {
  const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selected, setSelected] = useState<Selected>({});
  const [currentFilters, setCurrentFilters] = useState<{
    [key: string]: string;
  }>({});

  const [categories, setCategories] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  const filterRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCurrentFilters(initialFilters);
    setSelected({
      category: initialFilters.category,
      room: initialFilters.room,
      price: initialFilters.price,
      color: initialFilters.color,
      sort: initialFilters.sort,
    });
    setOpenedDropdown(null);
  }, [initialFilters]);

  // Debounce so quick successive picks trigger a single request
  const debouncedFilterChange = useCallback(
    (filters: { [key: string]: string }) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        onFilterChange(filters);
      }, 300);
    },
    [onFilterChange]
  );

  const apply = (nextSelected: Selected, nextFilters: { [key: string]: string }) => {
    setSelected(nextSelected);
    setCurrentFilters(nextFilters);
    setOpenedDropdown(null);
    debouncedFilterChange(nextFilters);
  };

  // Picking the active value again clears it
  const handleSelect = (type: GroupKey | "sort", value: string) => {
    if (selected[type] === value) {
      handleClear(type);
      return;
    }
    const newFilters = { ...currentFilters };
    const nextSelected = { ...selected, [type]: value };

    switch (type) {
      case "category":
        newFilters.category = value;
        break;
      case "room":
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
        break;
      case "price":
        newFilters.price = value;
        break;
      case "color": {
        const chosen = colors.find((c) => c.color_name === value);
        newFilters.color = colorMode === "hex" ? chosen?.color_hex ?? "" : value;
        break;
      }
      case "sort":
        newFilters.sort = value;
        break;
    }

    apply(nextSelected, newFilters);
  };

  const handleClear = (type: GroupKey | "sort") => {
    const newFilters = { ...currentFilters };
    const nextSelected = { ...selected };
    delete nextSelected[type];
    delete newFilters[type];
    if (type === "room") delete newFilters.roomSlug;
    apply(nextSelected, newFilters);
  };

  const clearAllFilters = () => {
    setSelected({});
    setOpenedDropdown(null);
    setCurrentFilters({});
    onFilterChange({});
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, roomRes, colorRes] = await Promise.all([
          http.get("/categories/filter/", { validateStatus: () => true }).then((res) => res.data),
          http.get("/rooms/filter/", { validateStatus: () => true }).then((res) => res.data),
          http.get("/color/filter/", { validateStatus: () => true }).then((res) => res.data),
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
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedDropdown(null);
        setSheetOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const activeCount = (["category", "room", "price", "color"] as GroupKey[])
    .filter((key) => !(key === "room" && hideRoomFilter))
    .filter((key) => !(key === "category" && hideCategoryFilter))
    .filter((key) => selected[key]).length;
  // The sheet only holds room, price and color; category chips stay on the page
  const sheetCount = activeCount - (selected.category && !hideCategoryFilter ? 1 : 0);

  const groups: ("room" | "price" | "color")[] = hideRoomFilter
    ? ["price", "color"]
    : ["room", "price", "color"];

  const optionNames = (group: "room" | "price" | "color"): string[] => {
    if (group === "room") return rooms.map((r) => r.room_name);
    if (group === "price") return PRICES;
    return colors.map((c) => c.color_name);
  };

  const swatchOf = (name: string) =>
    colors.find((c) => c.color_name === name)?.color_hex || "#ccc";

  const shortValue = (group: "room" | "price" | "color") => {
    const value = selected[group] ?? "";
    return group === "color" ? value.replace(/^Màu /, "") : value;
  };

  const renderOptions = (
    group: "room" | "price" | "color",
    variant: "menu" | "sheet"
  ) => {
    const names = optionNames(group);
    if (group === "color") {
      return (
        <div className="pf-swatches">
          {names.map((name) => (
            <button
              type="button"
              key={name}
              className={`pf-swatch ${selected.color === name ? "on" : ""}`}
              aria-pressed={selected.color === name}
              onClick={() => handleSelect("color", name)}
            >
              <span style={{ backgroundColor: swatchOf(name) }} />
              {name.replace(/^Màu /, "")}
            </button>
          ))}
        </div>
      );
    }
    return (
      <div className={variant === "menu" ? "pf-list" : "pf-wrap"}>
        {names.map((name) => (
          <button
            type="button"
            key={name}
            className={`${variant === "menu" ? "pf-row" : "pf-pill"} ${
              selected[group] === name ? "on" : ""
            }`}
            aria-pressed={selected[group] === name}
            onClick={() => handleSelect(group, name)}
          >
            {variant === "menu" && <i className="pf-radio" />}
            {name}
          </button>
        ))}
      </div>
    );
  };

  const sortOpen = openedDropdown === "sort";
  const sortControl = (
    <div className={`pf-group pf-sort ${sortOpen ? "open" : ""}`}>
      <div className={`pf-drop ${selected.sort ? "has" : ""}`}>
        <button
          type="button"
          className="pf-drop-btn"
          aria-expanded={sortOpen}
          aria-controls="pf-menu-sort"
          onClick={() => setOpenedDropdown(sortOpen ? null : "sort")}
        >
          <svg
            className="pf-sort-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 4v16M3.5 16.5 7 20l3.5-3.5M17 20V4M13.5 7.5 17 4l3.5 3.5" />
          </svg>
          {selected.sort ?? "Sắp xếp"}
        </button>
        {selected.sort && (
          <button
            type="button"
            className="pf-drop-x"
            aria-label="Bỏ sắp xếp"
            onClick={() => handleClear("sort")}
          >
            <CloseIcon />
          </button>
        )}
      </div>
      <div id="pf-menu-sort" className="pf-menu pf-menu--end">
        <div className="pf-list">
          {SORT_OPTIONS.map((option) => (
            <button
              type="button"
              key={option}
              className={`pf-row ${selected.sort === option ? "on" : ""}`}
              aria-pressed={selected.sort === option}
              onClick={() => handleSelect("sort", option)}
            >
              <i className="pf-radio" />
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container" ref={filterRef}>
      <div className="pf">
        {!hideCategoryFilter && (
          <div className="pf-cats" role="group" aria-label="Danh mục">
            <button
              type="button"
              className={`pf-pill ${selected.category ? "" : "on"}`}
              aria-pressed={!selected.category}
              onClick={() => handleClear("category")}
            >
              Tất cả
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.category_id}
                className={`pf-pill ${
                  selected.category === cat.category_name ? "on" : ""
                }`}
                aria-pressed={selected.category === cat.category_name}
                onClick={() => handleSelect("category", cat.category_name)}
              >
                {cat.category_name}
              </button>
            ))}
          </div>
        )}

        <div className="pf-bar">
          {/* Desktop: one popover per group */}
          <div className="pf-groups">
            {groups.map((group) => {
              const active = !!selected[group];
              const open = openedDropdown === group;
              return (
                <div
                  key={group}
                  className={`pf-group ${open ? "open" : ""}`}
                >
                  <div className={`pf-drop ${active ? "has" : ""}`}>
                    <button
                      type="button"
                      className="pf-drop-btn"
                      aria-expanded={open}
                      aria-controls={`pf-menu-${group}`}
                      onClick={() => setOpenedDropdown(open ? null : group)}
                    >
                      {GROUP_LABEL[group]}
                      {active && <>: {shortValue(group)}</>}
                    </button>
                    {active && (
                      <button
                        type="button"
                        className="pf-drop-x"
                        aria-label={`Bỏ lọc ${GROUP_LABEL[group]}`}
                        onClick={() => handleClear(group)}
                      >
                        <CloseIcon />
                      </button>
                    )}
                  </div>
                  <div
                    id={`pf-menu-${group}`}
                    className={`pf-menu ${group === "color" ? "wide" : ""}`}
                  >
                    {renderOptions(group, "menu")}
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              className={`pf-clear ${activeCount > 0 ? "show" : ""}`}
              aria-label="Xoá tất cả bộ lọc"
              title="Xoá tất cả bộ lọc"
              tabIndex={activeCount > 0 ? 0 : -1}
              onClick={clearAllFilters}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Phones: one button opens the sheet */}
          <button
            type="button"
            className="pf-open"
            aria-haspopup="dialog"
            onClick={() => setSheetOpen(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 5h18M6 12h12M10 19h4" />
            </svg>
            Bộ lọc
            {sheetCount > 0 && <span className="pf-badge">{sheetCount}</span>}
          </button>

          {sortControl}
        </div>
      </div>

      <div className={`pf-sheet ${sheetOpen ? "open" : ""}`} aria-hidden={!sheetOpen}>
        <button
          type="button"
          className="pf-scrim"
          tabIndex={-1}
          aria-label="Đóng bộ lọc"
          onClick={() => setSheetOpen(false)}
        />
        <div className="pf-panel" role="dialog" aria-modal="true" aria-label="Bộ lọc">
          <div className="pf-panel-head">
            Bộ lọc
            <button
              type="button"
              aria-label="Đóng"
              onClick={() => setSheetOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="pf-panel-body">
            {groups.map((group) => (
              <section key={group}>
                <h3>{GROUP_LABEL[group]}</h3>
                {renderOptions(group, "sheet")}
              </section>
            ))}
          </div>
          <div className="pf-panel-foot">
            <button type="button" className="pf-link" onClick={clearAllFilters}>
              Xoá tất cả
            </button>
            <button
              type="button"
              className="pf-apply"
              onClick={() => setSheetOpen(false)}
            >
              Xem kết quả
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
