import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

function AddEvent(props) {
    const [state, setState] = useState({
        judul_acara: null,
        lokasi: null,
        tanggal: null,
        waktu_mulai: null,
        waktu_selesai: null,
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
        Inertia.post("/createacara", state, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire("Berhasil!", "Data berhasil di inputkan.", "success");

                setState({
                    judul_acara: null,
                    lokasi: null,
                    tanggal: null,
                    waktu_mulai: null,
                    waktu_selesai: null,
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Judul Acara</label>
                <input
                    type="text"
                    className="form-control"
                    id="judul_acara"
                    name="judul_acara"
                    value={state.judul_acara}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 d-flex flex-column">
                <label className="form-label">Tanggal</label>
                <input
                    type="date"
                    className="form-control"
                    id="tanggal"
                    name="tanggal"
                    value={state.tanggal}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Lokasi Acara</label>
                <input
                    type="text"
                    className="form-control"
                    id="lokasi"
                    name="lokasi"
                    value={state.lokasi}
                    onChange={handleChange}
                />
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

export default AddEvent;
