import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DataTable from "react-data-table-component";
import { ChromePicker, SketchPicker } from "react-color";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function Partai(props) {
    const [displa, setdispla] = useState(false);
    const [pickedColor, setpickedcolor] = useState(null);
    const [id, setId] = useState(0);

    const handleClose = () => {
        setdispla(false);
        handleChangeComplete();
    };

    const handleChangeComplete = (e) => {
        Inertia.post('/changecolor/partai', {id: id, color: pickedColor});
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Data yang telah dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Batal",
            confirmButtonText: "Ya, Hapus saja!",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/delete/partai/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "Data berhasil dihapus.",
                            "success"
                        );
                    },
                });
            }
        });
    };
    const popover = {
        position: "absolute",
        zIndex: "2",
    };
    const cover = {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
    };

    const columns = [
        {
            name: "No Urut",
            width: "20%",
            selector: (row) => row.no_urut,
            sortable: true,
        },
        {
            name: "Nama",
            selector: (row) => row.nama_partai,
            sortable: true,
            width: "20%",
        },

        {
            name: "Nama Lengkap",
            selector: (row) => row.nama_lengkap,
            sortable: true,
            width: "40%",
        },
        {
            name: "Warna",
            width: "10%",
            cell: (row) => (
                <div
                    onClick={() => {
                        setdispla(true);
                        setId(row.id)
                        setpickedcolor(row.warna);
                    }}
                    className="w-100 text-white"
                    style={{ backgroundColor: row.warna }}
                >
                    {row.warna}
                </div>
            ),

            sortable: true,
        },
        {
            name: "Aksi",
            width: "10%",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="btn btn-danger"
                        id={row.id}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                    {/* <button className="btn btn-success" id={row.ID}>
                        <i className="fas fa-edit"></i>
                    </button> */}
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    return (
        <DashboardLayout
            authe={props.auth}
            errors={props.errors}
            current_menu={props.page.toLowerCase()}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs={`Home/Data ${props.page}`}
                            title={`Data ${props.page}`}
                        />
                        <Card title={"Table Data Partai"} addData={true}>
                            {displa ? (
                                <div style={popover}>
                                    <div style={cover} onClick={handleClose} />
                                    <div className="d-flex justify-content-center align-items-center">
                                    <ChromePicker
                                        color={pickedColor}
                                        onChange={(e) => setpickedcolor(e.hex)
                                        }
                                    />
                                    </div>
                                </div>
                            ) : null}
                            <DataTable
                                columns={columns}
                                data={props.data_partai}
                                pagination
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
