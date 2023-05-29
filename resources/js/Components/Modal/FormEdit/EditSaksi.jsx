import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { PhotoView } from "react-photo-view";
import Swal from "sweetalert2";

function EditSaksi({ row }) {
    const { errors, kecamatan, kelurahan } = usePage().props;
    const [state, setState] = useState({
        nama: null,
        alamat: null,
        kecamatan: null,
        kelurahan: null,
        rt: null,
        rw: null,
        telegram_id: null,
        no_handphone: null,
        referensi: null,
        no_tps: 1,
        file: null,
    });

    useEffect(() => {
        if(row){
            setState({
                nama: row.nama,
                alamat: row.alamat,
                kecamatan: row.kecamatan_id,
                kelurahan: row.kelurahan_id,
                rt: row.rt,
                telegram_id: row.telegram_id,
                rw: row.rw,
                no_handphone: row.no_handphone,
                referensi: row.referensi,
                no_tps: 1,
                file: row.photo,
            });
        }
    }, [row]);

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
        Inertia.post(`/edit/${row.id}`, state, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire("Berhasil!", "Data berhasil di inputkan.", "success");
                setState({
                    nama: null,
                    alamat: null,
                    kecamatan: null,
                    kelurahan: null,
                    rt: null,
                    telegram_id: null,
                    rw: null,
                    no_handphone: null,
                    referensi: null,
                    no_tps: 1,
                    file: null,
                });
            },
        });
    };

    const photo = () => {
        if(row){
            if (row.photo === null) {
                return (
                    <div style={{ width: 100 + "px" }} className="p-2">
                        <PhotoView
                            src={`https://api.telegram.org/file/bot5892352200:AAGjjmVYQwFQ1FUKujkm7x9Zn8Blm6pRpEQ/${row.telegram_photo}`}
                        >
                            <img
                                className="img-fluid"
                                src={`https://api.telegram.org/file/bot5892352200:AAGjjmVYQwFQ1FUKujkm7x9Zn8Blm6pRpEQ/${row.telegram_photo}`}
                                alt=""
                            />
                        </PhotoView>
                    </div>
                );
            } else {
                return (
                    <div style={{ width: 100 + "px" }} className="p-2">
                        <PhotoView src={`/data_file/${row.photo}`}>
                            <img
                                className="img-fluid"
                                src={`/data_file/${row.photo}`}
                                alt=""
                            />
                        </PhotoView>
                    </div>
                );
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                {
                    photo()
                }
            </div>
            <div className="mb-3">
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
                <label className="form-label">RW</label>
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
                <label className="form-label">RT</label>
                <input
                    value={state.rt}
                    type="text"
                    name="rt"
                    className="form-control"
                    onChange={handleChange}
                />
                {errors.rt && (
                    <div class="alert alert-warning" role="alert">
                        {errors.rt}
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
            </div>
            {/* <div className="mb-3">
                <label className="form-label">Telegram Id</label>
                <input
                    value={state.telegram_id}
                    type="text"
                    name="telegram_id"
                    className="form-control"
                    onChange={handleChange}
                />
            </div> */}
            {/* <div className="mb-3">
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
            </div> */}
            <div className="mb-3">
                <label className="form-label">Refrensi</label>
                <select
                    name="referensi"
                    class="form-select"
                    aria-label="Default select example"
                    onChange={handleChange}
                >
                    <option selected value={null}>Pilih Referensi</option>
                    <option value={'suhud alynudin'}>Suhud Alynudin</option>
                    <option value={'Ketua DPD'}>Ketua DPD</option>
                </select>
                {errors.referensi && (
                    <div class="alert alert-warning" role="alert">
                        {errors.referensi}
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

export default EditSaksi;
