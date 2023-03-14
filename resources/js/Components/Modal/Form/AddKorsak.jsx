import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

function AddKorsak(props) {
    const { errors, kecamatan, kelurahan } = usePage().props;
    const [state, setState] = useState({
        nama: null,
        alamat: null,
        kecamatan: null,
        kelurahan: null,
        rw: null,
        no_handphone: null,
        no_tps: null,
        file: null,
        telegram_id: null
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
        Inertia.post("/insert/korsak", state, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire("Berhasil!", "Data berhasil di inputkan.", "success");
                document.getElementById("form-korsak").reset();
                setState({
                    nama: null,
                    alamat: null,
                    kecamatan: null,
                    kelurahan: null,
                    rw: null,
                    no_handphone: null,
                    no_tps: null,
                    file: null,telegram_id: null
                });
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} id="form-korsak">
            <div className="mb-3" >
                <label className="form-label">Nama Lengkap</label>
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
            <div className="mb-3">
                <label className="form-label">RT/RW</label>
                <input
                    value={state.rw}
                    type="text"
                    name="rw"
                    className="form-control"
                    onChange={handleChange}
                />
                {errors.rw && (
                    <div class="alert alert-warning" role="alert">
                        {errors.rw}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">No Handphone</label>
                <input
                    value={state.no_handphone}
                    type="number"
                    name="no_handphone"
                    className="form-control"
                    onChange={handleChange}
                />
                {errors.no_handphone && (
                    <div class="alert alert-warning" role="alert">
                        {errors.no_handphone}
                    </div>
                )}
            </div><div className="mb-3">
                <label className="form-label">Telegram Id</label>
                <input
                    value={state.telegram_id}
                    type="text"
                    name="telegram_id"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">No TPS</label>
                <input
                    value={state.no_tps}
                    name="no_tps"
                    type="number"
                    className="form-control"
                    onChange={handleChange}
                />
                {errors.no_tps && (
                    <div class="alert alert-warning" role="alert">
                        {errors.no_tps}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label for="formFile" class="form-label">
                    Foto Diri
                </label>
                <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="file"
                    onChange={handleChange}
                />
                {errors.file && (
                    <div class="alert alert-warning" role="alert">
                        {errors.file}
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

export default AddKorsak;
