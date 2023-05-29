import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

function AddDpd(props) {
    const { partai } = usePage().props;
    const [state, setState] = useState({
        nama: null,
        no_urut: null,
        tempat_tinggal: null,
        jk: null,
        partai: null,
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
        Inertia.post("/insert/dpd", state, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire("Berhasil!", "Data berhasil di inputkan.", "success");

                setState({
                    nama: null,
                    no_urut: null,
                    tempat_tinggal: null,
                    jk: null,
                    partai: null,
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nama Calon</label>
                <input
                    type="text"
                    className="form-control"
                    id="nama"
                    name="nama"
                    value={state.nama}
                    onChange={handleChange}
                />
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
            </div>
            <div className="mb-3">
                <label className="form-label">Jenis Kelamin</label>
                <select class="form-select" name="jk" aria-label="Default select example" onChange={handleChange}>
                    <option selected>Pilih Salah Satu</option>
                    <option value="lk">Laki Laki</option>
                    <option value="pr">Perempuan</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Partai</label>
                <select class="form-select" name="partai" aria-label="Default select example" onChange={handleChange}>
                    <option selected>Pilih Salah Satu</option>
                    {partai.map(e=><option value={e.id}>{e.nama_partai}</option>)}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Tempat Tinggal</label>
                <input
                    type="text"
                    className="form-control"
                    id="tempat_tinggal"
                    name="tempat_tinggal"
                    value={state.tempat_tinggal}
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

export default AddDpd;
