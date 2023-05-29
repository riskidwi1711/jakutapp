import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

function UserRegistered(props) {
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
                Inertia.delete(`/delete/user/${id}`, {
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

    const handleAccess = (id) => {
        let us = props.pengguna.find((e) => e.id === id);
        Swal.fire({
            title: "Apakah anda yakin?",
            text: "Memberikan akses kepada user " + us.name,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Batal",
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.put(`/giveaccess/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "user berhasil diberi akses.",
                            "success"
                        );
                    },
                });
            }
        });
    };
    const columns = [
        {
            name: "Nama",
            width: "10%",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Alamat Email",
            selector: (row) => row.email,
            sortable: true,
            width: "20%",
        },
        {
            name: "No Handphone",
            selector: (row) => row.no_handphone,
            sortable: true,
            width: "20%",
        },
        {
            name: "Telegram Id",
            selector: (row) => row.telegram_id,
            sortable: true,
            width: "20%",
        },
        {
            name: "Keterangan",
            selector: (row) =>
                row.keterangan,
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
                    <button
                        onClick={() => handleAccess(row.id)}
                        className="btn btn-success"
                        id={row.ID}
                    >
                        <i className="fas fa-key"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    console.log(props.pengguna)
    return (
        <DashboardLayout
            authe={props.auth}
            errors={props.errors}
            current_menu={props.page.toLowerCase()}
        >
            <div class="main-content">
                <div class="page-content">
                    <div class="container-fluid">
                        <PageTitle
                            crumbs="Home/Pengguna"
                            title="Pengguna Terdaftar"
                        />
                        <Card
                            title={"Tabel pengguna yang mendaftar"}
                            addData={false}
                        >
                            <DataTable
                                columns={columns}
                                pagination
                                data={props.pengguna}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default UserRegistered;
