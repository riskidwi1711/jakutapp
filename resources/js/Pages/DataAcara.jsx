import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

function DataAcara(props) {

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
                Inertia.delete(`/deleteevent/${id}`, {
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
            name: "Judul Acara",
            width: "30%",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Lokasi",
            selector: (row) => row.lokasi,
            sortable: true,
            width: "20%",
        },
        {
            name: "Kode Acara",
            width: "20%",
            selector: (row) => row.kode_acara,
            sortable: true,
        },
        {
            name: "Tanggal",
            width: "20%",
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: "Aksi",
            width: "10%",
            selector: (row) => (
                <div className="d-flex gap-2">
                    <button
                    onClick={()=>handleDelete(row.id)}
                        className="btn btn-danger"
                        id={row.id}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            ),
            sortable: true,
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
                        <Card addData={true} title={"Tabel data acara"}>
                            <DataTable
                                data={props.data}
                                pagination
                                columns={columns}
                            />
                        </Card>
                        <Card addData={false} title={"Kalender acara"}>
                            <FullCalendar
                                headerToolbar={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth,dayGridWeek,dayGridDay",
                                }}
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                events={props.data}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DataAcara;
