import React, { useState } from "react";

function SearchData({ data, onText, handleSearch }) {
  const handleChange = (e) => {
    onText(e.target.value);
  };

  return (
    <div className=" col-sm-12 col-md-3 p-md-0">
      <label htmlFor="" className="form-label">
        Cari Data
      </label>
      <div className="d-flex gap-2">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          onChange={handleChange}
          placeholder="Ketikan sesuatu"
        />
      </div>
    </div>
  );
}

export default SearchData;
