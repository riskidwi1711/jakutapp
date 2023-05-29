import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

function AddUser(props) {
  const { errors, kecamatan, kelurahan } = usePage().props;
  const [state, setState] = useState({
    nama: null,
    email: null,
    no_handphone: null,
    telegram_id: null,
    keterangan: null,
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
    Inertia.post("/insert/user", state, {
      forceFormData: true,
      onSuccess: () => {
        Swal.fire("Berhasil!", "Data berhasil di inputkan.", "success");
        document.getElementById("form-user").reset();
        setState({
          nama: null,
          email: null,
          no_handphone: null,
          telegram_id: null,
          keterangan: null,
          no_tps: null,
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} id="form-user">
      <div className="mb-3">
        <label className="form-label">Nama</label>
        <input
          type="text"
          className="form-control"
          id="nama"
          name="nama"
          value={state.nama}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="nama"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">No Handphone</label>
        <input
          type="number"
          className="form-control"
          id="nama"
          name="no_handphone"
          value={state.no_handphone}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Telegram Id</label>
        <input
          type="text"
          className="form-control"
          id="nama"
          name="telegram_id"
          value={state.telegram_id}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Keterangan</label>
        <input
          type="text"
          className="form-control"
          id="keterangan"
          name="keterangan"
          value={state.keterangan}
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

export default AddUser;
