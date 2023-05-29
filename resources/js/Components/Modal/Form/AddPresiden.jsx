import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

function AdddPresiden(props) {
    const { errors, kecamatan, kelurahan } = usePage().props;
    const [state, setState] = useState({
        nama: null,
        warna: null,
        no_urut: null,
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
        Inertia.post("/insert/presiden", state, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire("Berhasil!", "Data berhasil di inputkan.", "success");

                setState({
                    nama: null,
                    warna: null,
                    no_urut: null,
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nama Calon Presiden</label>
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
                <label className="form-label">No Urut</label>
                <input
                    type="number"
                    className="form-control"
                    id="nama"
                    name="no_urut"
                    value={state.no_urut}
                    onChange={handleChange}
                />
                {errors.nama && (
                    <div class="alert alert-warning" role="alert">
                        {errors.nama}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Warna</label>
                <input
                    type="color"
                    className="form-control"
                    id="nama"
                    name="warna"
                    value={state.warna}
                    onChange={handleChange}
                />
                {errors.nama && (
                    <div class="alert alert-warning" role="alert">
                        {errors.nama}
                    </div>
                )}
            </div>
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

export default AdddPresiden;
