import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

export default function Dprri(props) {
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
                Inertia.delete(`/delete/dprri/${id}`, {
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
    const columns = [
        {
            name: "No Urut",
            width: "10%",
            selector: (row) => row.no_urut,
            sortable: true,
        },
        {
            name: "Nama",
            selector: (row) => row.nama_calon,
            sortable: true,
            width: "20%",
        },
        {
            name: "Jenis Kelamin",
            selector: (row) => row.jk,
            sortable: true,
            width: "20%",
        },
        {
            name: "Nama partai",
            selector: (row) => row.nama_partai,
            sortable: true,
            width: "20%",
        },
        {
            name: "Tempat Tinggal",
            selector: (row) => row.tempat_tinggal,
            sortable: true,
            width: "20%",
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
                        <Card title={"Table Data DPR RI"} addData={true}>
                            <DataTable
                                columns={columns}
                                data={props.data_caleg}
                                pagination
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
