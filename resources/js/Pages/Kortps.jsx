import Card from '@/Components/Card/Card';
import PageTitle from '@/Components/PageTitle';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import { PhotoView } from 'react-photo-view';

function Kortps(props) {
    const [data, setData] = useState(props.data_tim_pemenangan);
    useEffect(() => {
        const interval = setInterval(() => {
            Inertia.reload('data_tim_pemenangan', {preserveScroll:true, preserveState: true});
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
                Inertia.delete(`/delete/kortps/${id}`, {onSuccess:()=>{
                    Swal.fire(
                        'Terhapus!',
                        'Data berhasil dihapus.',
                        'success'
                      )
                }})
            }
        });
    };

    const columns = [
        {
            name: "Foto",
            width: "10%",
            cell: (row) => {
                if (row.photo === null) {
                  return  <div style={{ width: 50 + "px" }} className="p-2">
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
                } else {
                  return  <div style={{ width: 50 + "px" }} className="p-2">
                        <PhotoView src={`/data_file/${row.photo}`}>
                            <img
                                className="img-fluid"
                                src={`/data_file/${row.photo}`}
                                alt=""
                            />
                        </PhotoView>
                    </div>;
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
                        onClick={()=>handleDelete(row.id)}
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
        <DashboardLayout authe={props.auth} errors={props.errors} current_menu={props.page.toLowerCase()}>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle crumbs={`Home/Data ${props.page}`} title={`Data ${props.page}`} />
                        <Card addData={true} title={'Data Koordinator TPS'} downloadDta={true} data={data}>
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
                            <DataTable columns={columns} data={props.data_tim_pemenangan} pagination/>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Kortps;