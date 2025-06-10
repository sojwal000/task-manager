import React from "react";

const FilterButtons = ({ setFilter }) => {
  return (
    <div className="filter-buttons">
      <button onClick={() => setFilter("All")} className="filter-button">
        All
      </button>
      <button onClick={() => setFilter("Completed")} className="filter-button">
        Completed
      </button>
      <button onClick={() => setFilter("Incomplete")} className="filter-button">
        Incomplete
      </button>
    </div>
  );
};

export default FilterButtons;