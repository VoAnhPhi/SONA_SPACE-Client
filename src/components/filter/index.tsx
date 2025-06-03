const Filter = () => {
  return (
    <>
      {/* filter */}
       <section className="filter-container">
            <div className="filter-group">
                <div className="filter-group1">
                    <i className="fa-solid fa-filter"></i>
                    <span>Bộ lọc</span>
                </div>
                <div className="filter-group2">
                    <span>Danh mục:</span>
                    <select>
                        <option>Chọn danh mục</option>
                        <option>Danh mục 1</option>
                        <option>Danh mục 2</option>
                    </select>
                </div>
                <div className="filter-group2">
                    <span>Danh mục:</span>
                    <select>
                        <option>Chọn danh mục</option>
                        <option>Danh mục 1</option>
                        <option>Danh mục 2</option>
                    </select>
                </div>
                  <div className="filter-group2">
                    <span>Danh mục:</span>
                    <select>
                        <option>Chọn danh mục</option>
                        <option>Danh mục 1</option>
                        <option>Danh mục 2</option>
                    </select>
                </div>
            </div>
              <div className="sort-button">
                 <i className="fa-solid fa-filter"></i>
                <span>Sắp xếp</span>
                    <select>
                        <option value=""></option>
                    </select>
                </div>
        </section>
    </>
  );
};

export default Filter;
