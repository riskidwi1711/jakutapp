import Kecamatan from "@/Pages/Wilayah/Kecamatan";
import React, { useState } from "react";

function FilterData({ acara, kecamatan, onAcara, onKecamatan }) {
  return (
    <div className="row w-100">
      <div className="col-sm-12 col-md-4">
        <label htmlFor="" className="form-label">
          Filter Acara
        </label>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            onAcara(e.target.value);
          }}
        >
          <option selected value={"init"}>
            Pilih Acara
          </option>
          {acara.map((e) => {
            return <option value={e.kode_acara}>{e.title}</option>;
          })}
        </select>
      </div>
      <div className="col-sm-12 col-md-4">
        <label htmlFor="" className="form-label">
          Filter Kecamatan
        </label>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            onKecamatan(e.target.value);
          }}
        >
          <option selected value={"init"}>
            Pilih Kecamatan
          </option>
          {kecamatan.map((e) => {
            return <option value="as">{e.nama}</option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default FilterData;
