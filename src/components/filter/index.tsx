const Filter = () => {
  return (
    <>
      {/* filter */}

       <section className="filter-container">
              <div className="container">
        <div className="filter-width">
            <div className="filter-group">
                <div className="filter-group1">
                    <img src="images/products/filter.svg" alt="" />
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
            </div>
        </div>
        </section>
        
    </>
  );
};

export default Filter;
