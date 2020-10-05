import React from "react";

import "./styles.css";

const Select = () => {
  return (
    <form className="pokedex-control">
      <div className="form-control">
        <label htmlFor="filter-name">Name:</label>
        <input type="search" id="filter-name" />
      </div>
      <div className="form-control">
        <label htmlFor="filter-type">Type:</label>
        <select id="filter-type">
          <option value="">All</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="sort">Sort:</label>
        <select id="sort-type">
          <option>Lowest Number (First)</option>
          <option>Highest Number (First)</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>
    </form>
  );
};

export default Select;
