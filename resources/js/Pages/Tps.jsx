import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import TableLayout from "@/Components/TableLayout";
import Thead from "@/Components/Thead";
import Tbody from "@/Components/Tbody";
import Modal from "react-modal";

export default function Tps(props) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    }
    return (
        <DashboardLayout auth={props.auth} errors={props.errors}>
            <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div style={{width:'30vw'}}>
                        <form>
                            <div class="mb-3">
                                <label
                                    for="nama"
                                    class="form-label"
                                >
                                    Nama Calon
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="nama"
                                    name="nama"
                                />
                            </div>
                            <div class="mb-3">
                                <label
                                    for="Partai"
                                    class="form-label"
                                >
                                    Partai
                                </label>
                                <input
                                    type="text"
                                    name="partai"
                                    class="form-control"
                                    id="Partai"
                                />
                            </div>
                            <div class="mb-3">
                                <label
                                    for="Partai"
                                    class="form-label"
                                >
                                    Dapil
                                </label>
                                <input
                                    type="text"
                                    name="partai"
                                    class="form-control"
                                    id="Partai"
                                />
                            </div>
                            <div class="mb-3">
                                <label
                                    for="Partai"
                                    class="form-label"
                                >
                                    TPS
                                </label>
                                <input
                                    type="text"
                                    name="partai"
                                    class="form-control"
                                    id="Partai"
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Simpan
                            </button>
                        </form>
                    </div>
                </Modal>
            <div class="main-content">
                <div class="page-content">
                    <div class="container-fluid">
                        <PageTitle crumbs="Home/Tps" title="Tps" />
                        <Card title={'Tabel TPS'} >
                        <div className="my-2 d-flex justify-content-end">
                                <button
                                    onClick={() => openModal()}
                                    className="btn btn-primary"
                                >
                                    Tambah TPS
                                </button>
                            </div>
                        <TableLayout>
                                <Thead>
                                    <th class="align-middle">No</th>
                                    <th class="align-middle">Nama Tps</th>
                                    <th class="align-middle">Alamat</th>
                                    <th class="align-middle">Kecamatan</th>
                                    <th class="align-middle">Aksi</th>
                                </Thead>
                                <Tbody>
                                    {props.tps.map((item, index) => (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.alamat}</td>
                                            <td>{item.kecamatan}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-primary">
                                                        Edit
                                                    </button>{" "}
                                                    <button className="btn btn-danger">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </Tbody>
                            </TableLayout>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
