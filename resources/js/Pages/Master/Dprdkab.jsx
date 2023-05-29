import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DataTable from "react-data-table-component";

export default function Dprdkab(props) {
    const columns = [
        {
            name: "No Urut",
            width: "20%",
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
                        <Card title={"Table Data Caleg DPRD KAB"}>
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
