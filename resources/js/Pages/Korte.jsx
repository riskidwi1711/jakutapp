import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { PhotoView } from "react-photo-view";
import LokasiFilter from "@/Components/Filter/LokasiFilter";
import EditButton from "@/Components/Modal/EditButton";

function Korte(props) {
    const [data, setData] = useState(props.data_tim_pemenangan);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedIdKec, setSelectedIdKec] = useState(null);
    const [selectedIdKel, setSelectedIdKel] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = () => {
        let filteredData = props.data_tim_pemenangan;
        if (selectedIdKec) {
            filteredData = filteredData.filter((item) => {
                let id = item.kecamatan_id.toString();
                return id.includes(selectedIdKec);
            });
        }

        if (selectedIdKel) {
            filteredData = data.filter((item) => {
                let id = item.kelurahan_id.toString();
                return id.includes(selectedIdKel);
            });
        }
        setFilteredData(filteredData);
    };

    const handleSearch = (text) => {
        setIsSearch(true);
        let filteredData = props.data_tim_pemenangan;
        filteredData = data.filter((item) => {
            let nama = item.nama.toString();
            let email = item.no_handphone.toString();
            return (
                nama.includes(text) ||
                email.includes(text) 
            );
        });

        console.log(filteredData);
        setFilteredData(filteredData);
    };

    useEffect(() => {
        handleFilter();
    }, [selectedIdKec, selectedIdKel]);
    useEffect(() => {
        const interval = setInterval(() => {
            Inertia.reload("data_tim_pemenangan", {
                preserveScroll: true,
                preserveState: true,
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

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
                Inertia.delete(`/delete/korte/${id}`, {
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
            width: "15%",
            selector: (row) => row.nama,
            sortable: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
            sortable: true,
            width: "35%",
        },
        {
            name: "RT/RW",
            selector: (row) => `${row.rt}/${row.rw}`,
            sortable: true,
            width: "10%",
        },
        {
            name: "No Telp",
            width: "15%",
            selector: (row) => row.no_handphone,
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
                    <EditButton
                        click={setSelectedId}
                        row={row}
                        title={<i className="fas fa-edit"></i>}
                    />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    const ExpandedComponent = ({ data }) => (
        <div className="py-3">
          <p>Nama : {data.nama}</p>
          <p>Alamat : {data.alamat}</p>
          <p>Kecamatan : {props.kecamatan.find((e)=>e.id == data.kecamatan_id).nama}</p>
          <p>Kelurahan : {props.kelurahan.find((e)=>e.id == data.kelurahan_id).nama}</p>
          <p>RT : {data.rt}</p>
          <p>RW : {data.rw}</p>
          <p>No Telp : {data.no_handphone}</p>
        </div>
      );
    return (
        <DashboardLayout
            authe={props.auth}
            errors={props.errors}
            current_menu={props.page.toLowerCase()}
            selectedId={selectedId}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs={`Home/Data ${props.page}`}
                            title={`Data ${props.page}`}
                        />
                        <Card
                            addData={true}
                            title={"Data Koordinator RT"}
                            downloadDta={true}
                            data={data}
                            uploadData={true}
                        >
                            <LokasiFilter
                                dataFilter={[props.kecamatan, props.kelurahan]}
                                setSelectedIdKec={setSelectedIdKec}
                                setSelectedIdKel={setSelectedIdKel}
                                selectedIdKec={selectedIdKec}
                                handleSearch={handleSearch}
                            />
                            {/* <div className="row">
                                <div className="col-4">
                                    <label htmlFor="" className="form-label">
                                        Filter Nama
                                    </label>
                                    <input
                                        type="text"
                                        name="fil_text"
                                        id=""
                                        className="form-control"
                                        onChange={(e) => {
                                            let d =
                                                props.data_tim_pemenangan.filter(
                                                    (ee) =>
                                                        ee.nama.includes(
                                                            e.target.value
                                                        )
                                                );
                                            console.log(d);
                                            setData(d);
                                        }}
                                    />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="" className="form-label">
                                        Filter Alamat
                                    </label>
                                    <input
                                        type="text"
                                        name="fil_text"
                                        id=""
                                        className="form-control"
                                        onChange={(e) => {
                                            let d =
                                                props.data_tim_pemenangan.filter(
                                                    (ee) =>
                                                        ee.alamat.includes(
                                                            e.target.value
                                                        )
                                                );
                                            console.log(d);
                                            setData(d);
                                        }}
                                    />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="" className="form-label">
                                        Filter No TPS
                                    </label>
                                    <input
                                        type="text"
                                        name="fil_text"
                                        id=""
                                        className="form-control"
                                        onChange={(e) => {
                                            let d =
                                                props.data_tim_pemenangan.filter(
                                                    (ee) =>
                                                        ee.no_tps ==
                                                        e.target.value
                                                );
                                            if (d.length < 1) {
                                                setData(
                                                    props.data_tim_pemenangan
                                                );
                                            } else {
                                                setData(d);
                                            }
                                        }}
                                    />
                                </div>
                            </div> */}
                            <DataTable
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                                columns={columns}
                                data={
                                    selectedIdKec
                                        ? filteredData
                                        : isSearch
                                        ? filteredData
                                        : props.data_tim_pemenangan
                                }
                                pagination
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Korte;
