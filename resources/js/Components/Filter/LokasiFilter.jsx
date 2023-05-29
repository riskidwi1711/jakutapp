import React, { useState } from "react";

function LokasiFilter({
    dataFilter,
    setSelectedIdKec,
    setSelectedIdKel,
    selectedIdKec,
    handleSearch,
}) {
    const [text, setText] = useState("");
    return (
        <div className="row justify-content-between">
            <div className="col-sm-12 col-md-9 row align-items-end">
                <div className="col-sm-12 col-md-4">
                    <label htmlFor="" className="form-label">
                        Filter Kecamatan
                    </label>
                    <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) => {
                            setSelectedIdKec(e.target.value)
                            if(e.target.value === 'init'){
                                setSelectedIdKec(null) 
                            }
                        }}
                    >
                        <option selected value={'init'}>Pilih kecamatan</option>
                        {dataFilter[0].map((e) => {
                            return <option value={e.id}>{e.nama}</option>;
                        })}
                    </select>
                </div>
                {selectedIdKec && (
                    <div className="col-sm-12 col-md-4">
                        <label htmlFor="" className="form-label">
                            Filter Kelurahan
                        </label>
                        <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={(e) => {
                                setSelectedIdKel(e.target.value)
                                if(e.target.value === 'init'){
                                    setSelectedIdKel(null) 
                                }
                            }}
                        >
                            <option selected value={'init'}>
                                Pilih kelurahan
                            </option>
                            {dataFilter[1].map((e) => {
                                if (e.kecamatan_id == selectedIdKec) {
                                    return (
                                        <option value={e.id}>{e.nama}</option>
                                    );
                                }
                            })}
                        </select>
                    </div>
                )}
                {selectedIdKec ? (
                    <div className="col-4">
                        <button
                            onClick={() => {
                                setSelectedIdKec(null);
                                setSelectedIdKel(null);
                            }}
                            className="btn btn-primary"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className=" col-sm-12 col-md-3 p-md-0">
                <label htmlFor="" className="form-label">
                    Cari Data
                </label>
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ketikan sesuatu"
                    />
                    <button
                        onClick={() => handleSearch(text)}
                        className="fas fa-search btn btn-primary"
                    ></button>
                </div>
            </div>
        </div>
    );
}

export default LokasiFilter;
