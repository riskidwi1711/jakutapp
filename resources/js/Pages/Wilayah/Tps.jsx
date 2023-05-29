import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Tps(props) {
    const  [data , setData] = useState(props.tps)
    const columns = [
        {
            name: "Provinsi",
            width: "16.6%",
            selector: (row) => "DKI Jakarta",
            sortable: true,
        },
        {
            name: "Kab/Kota",
            selector: (row) => "Jakarta Utara",
            sortable: true,
            width: "16.6%",
        },
        {
            name: "Kecamatan",
            selector: (row) => row.kec_nama,
            sortable: true,
            width: "16.6%",
        },
        {
            name: "Kelurahan",
            selector: (row) => row.kel_nama,
            sortable: true,
            width: "16.6%",
        },
        {
            name: "Nama",
            width: "16.6%",
            selector: (row) => row.nama,
            sortable: true,
        },
        {
            name: "Aksi",
            width: "16.6%",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <a
                        href={`/detailwilayah/tps/${row.id}`}                        
                        className="btn btn-info"
                        id={row.id}
                    >
                        <i className="fas fa-eye"></i>
                    </a>
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
            current_menu={"datatps"}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs={`Home/Data Wilayah/Tps`}
                            title={`Data Tps`}
                        />
                        <Card title={"Table Data Wilayah TPS"}>
                            <div className="row">
                                <div className="col-4">
                                <label htmlFor="" className="form-label">Filter Kecamatan</label>
                                <input type="text" name="fil_text" id="" className="form-control" onChange={(e)=>{
                                    let d = props.tps.filter((ee)=> ee.kec_nama.includes(e.target.value))
                                    console.log(d)
                                    setData(d)
                                }}/>
                                </div>
                                <div className="col-4">
                                <label htmlFor="" className="form-label">Filter Kelurahan</label>
                                <input type="text" name="fil_text" id="" className="form-control" onChange={(e)=>{
                                    let d = props.tps.filter((ee)=> ee.kel_nama.includes(e.target.value))
                                    console.log(d)
                                    setData(d)
                                }}/>
                                </div>
                                <div className="col-4">
                                <label htmlFor="" className="form-label">Filter Nama TPS</label>
                                <input type="text" name="fil_text" id="" className="form-control" onChange={(e)=>{
                                    let d = props.tps.filter((ee)=> ee.nama.includes(e.target.value))
                                    console.log(d)
                                    setData(d)
                                }}/>
                                </div>
                            </div>
                            <DataTable
                                columns={columns}
                                data={data}
                                pagination
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Tps;
