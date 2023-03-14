import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

function AddTps(props) {
    const { errors, kecamatan, kelurahan } = usePage().props;
    const [state, setState] = useState({
        nama: null,
        kecamatan: null,
        kelurahan: null,
        rw: null,
        no_tps: null,
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == "file") {
            setState({ ...state, [name]: event.target.files[0] });
        } else {
            setState({ ...state, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/insert/tps", state, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire("Berhasil!", "Data berhasil di inputkan.", "success");

                setState({
                    nama: null,
                    kecamatan: null,
                    kelurahan: null,
                    rw: null,
                    no_tps: null,
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nama Tps</label>
                <input
                    type="text"
                    className="form-control"
                    id="nama"
                    name="nama"
                    value={state.nama}
                    onChange={handleChange}
                />
                {errors.nama && (
                    <div class="alert alert-warning" role="alert">
                        {errors.nama}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Kecamatan</label>
                <select
                    name="kecamatan"
                    class="form-select"
                    aria-label="Default select example"
                    onChange={handleChange}
                >
                    <option selected>Pilih Kecamatan</option>
                    {kecamatan.map((el) => {
                        return <option value={el.id}>{el.nama}</option>;
                    })}
                </select>
                {errors.kecamatan && (
                    <div class="alert alert-warning" role="alert">
                        {errors.kecamatan}
                    </div>
                )}
            </div>
            {state.kecamatan !== null ? (
                <div className="mb-3">
                    <label className="form-label">Kelurahan</label>
                    <select
                        name="kelurahan"
                        class="form-select"
                        aria-label="Default select example"
                        onChange={handleChange}
                    >
                        <option selected>Pilih Kelurahan</option>
                        {kelurahan.map((el) => {
                            if (el.kecamatan_id == state.kecamatan) {
                                return <option value={el.id}>{el.nama}</option>;
                            }
                        })}
                    </select>
                    {errors.kelurahan && (
                        <div class="alert alert-warning" role="alert">
                            {errors.kelurahan}
                        </div>
                    )}
                </div>
            ) : (
                <div></div>
            )}
            <div className="d-flex gap-2 mt-4 justify-content-end">
                <button type="submit" className="btn btn-primary btn-block">
                    Simpan
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Tutup
                </button>
            </div>
        </form>
    );
}

export default AddTps;
