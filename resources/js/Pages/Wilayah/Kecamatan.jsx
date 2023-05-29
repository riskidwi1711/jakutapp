import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import DataTable from "react-data-table-component";

function Kecamatan(props) {
    const columns = [
        {
            name: "Slug",
            width: "20%",
            selector: (row) => row.slug,
            sortable: true,
        },
        {
            name: "Provinsi",
            width: "30%",
            selector: (row) => "DKI Jakarta",
            sortable: true,
        },
        {
            name: "Kab/Kota",
            selector: (row) => "Jakarta Utara",
            sortable: true,
            width: "30%",
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
            current_menu={"datakecamatan"}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs={`Home/Data Wilayah/Kecamatan`}
                            title={`Data Kecamatan`}
                        />
                        <Card title={"Table Data Wilayah Kecamatan"}>
                            <DataTable
                                columns={columns}
                                data={props.kecamatan}
                                pagination
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Kecamatan;
