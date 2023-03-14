import Card from '@/Components/Card/Card';
import PageTitle from '@/Components/PageTitle';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Inertia } from '@inertiajs/inertia';
import moment from 'moment';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

function Notification(props) {
    const [bot_api, setbot_api] = useState('');

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
      }

    const handleSubmit =(e) =>{
        e.preventDefault();
        Inertia.post('/pengaturan/bot-telegram', {bot_api: bot_api})
    }

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
            Inertia.delete(`/deletenotif/${id}`, {
              onSuccess: () => {
                Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
              },
            });
          }
        });
      };


    const columns = [
        {
            name: "Notifikasi",
            selector: (row) => row.data,
            sortable: true,
            width: "40%",
        },
        {
            name: "Waktu",
            selector: (row) => moment(row.created_at).format('LLL'),
            sortable: true,
            width: "35%",
        },
        {
            name: "Aksi",
            width: "20%",
            cell: (row) => (
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
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <DashboardLayout authe={props.auth} errors={props.errors} current_menu={'notifikasi'}>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle crumbs="Home/Bot Setting" title="Notifikasi" />
                        <Card title={'Notifikasi Telegram'}>
                            <DataTable data={props.telegram} columns={columns} pagination/>
                        </Card>
                        <Card title={'Notifikasi WhatsApp'}>
                        <DataTable data={props.whatsapp} columns={columns} pagination/>
                        </Card>
                    </div>
                    
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Notification;