import React from 'react';

function Filter({master, }) {
    return (
        <div className="row">
        <div className="col-4">
            <label htmlFor="" className="form-label">
                Filter Nama
            </label>
            <input
                type="text"
                name="fil_text"
                id=""
                className="form-control"
                onChange={(e) => {
                    let d =
                        props.master.filter(
                            (ee) =>
                                ee.nama.includes(
                                    e.target.value
                                )
                        );
                    console.log(d);
                    setData(d);
                }}
            />
        </div>
        <div className="col-4">
            <label htmlFor="" className="form-label">
                Filter Alamat
            </label>
            <input
                type="text"
                name="fil_text"
                id=""
                className="form-control"
                onChange={(e) => {
                    let d =
                        props.master.filter(
                            (ee) =>
                                ee.alamat.includes(
                                    e.target.value
                                )
                        );
                    console.log(d);
                    setData(d);
                }}
            />
        </div>
        <div className="col-4">
            <label htmlFor="" className="form-label">
                Filter No TPS
            </label>
            <input
                type="text"
                name="fil_text"
                id=""
                className="form-control"
                onChange={(e) => {
                    let d =
                        props.data_tim_pemenangan.filter(
                            (ee) =>
                                ee.no_tps ==
                                e.target.value
                        );
                    if (d.length < 1) {
                        setData(
                            props.master
                        );
                    } else {
                        setData(d);
                    }
                }}
            />
        </div>
    </div>
    );
}

export default Filter;