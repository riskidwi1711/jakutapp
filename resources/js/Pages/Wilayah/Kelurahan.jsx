import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import DataTable from "react-data-table-component";

function Kelurahan(props) {
    const columns = [
        {
            name: "slug",
            width: "20%",
            selector: (row) => row.slug,
            sortable: true,
        },
        {
            name: "Provinsi",
            width: "20%",
            selector: (row) => "DKI Jakarta",
            sortable: true,
        },
        {
            name: "Kab/Kota",
            selector: (row) => "Jakarta Utara",
            sortable: true,
            width: "20%",
        },
        {
            name: "Kecamatan",
            width: "20%",
            selector: (row) => row.kec_nama,
            sortable: true,
        },
        {
            name: "Nama",
            width: "20%",
            selector: (row) => row.nama,
            sortable: true,
        },
    ];
    return (
        <DashboardLayout
            authe={props.auth}
            errors={props.errors}
            current_menu={"datakelurahan"}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs={`Home/Data Wilayah/Kelurahan`}
                            title={`Data Kelurahan`}
                        />
                        <Card title={"Table Data Wilayah Kelurahan"}>
                            <DataTable
                                columns={columns}
                                data={props.kelurahan}
                                pagination
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Kelurahan;
