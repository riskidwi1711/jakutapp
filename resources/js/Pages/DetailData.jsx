import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import DataTable from "react-data-table-component";
import Iframe from "react-iframe";
import { PhotoView } from "react-photo-view";

function DetailData(props) {

    const columns = [
        {
            name: "Foto",
            width: "10%",
            cell: (row) => {
                if (row.photo === null) {
                    return (
                        <div style={{ width: 50 + "px" }} className="p-2">
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
                        <div style={{ width: 50 + "px" }} className="p-2">
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
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Nama",
            width: "20%",
            selector: (row) => row.nama,
            sortable: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
            sortable: true,
            width: "40%",
        },
        {
            name: "No Telp",
            width: "10%",
            selector: (row) => row.no_handphone,
            sortable: true,
        },
        {
            name: "No TPS",
            width: "10%",
            selector: (row) => row.no_tps,
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
            current_menu={"Detail Data"}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs="Home/Detail Data"
                            title="Peta Data"
                        />
                        <Card
                            title={"Detail Data"}
                        >
                            <DataTable columns={columns} data={props.data_tim_pemenangan}/>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DetailData;
