import Card from '@/Components/Card/Card';
import PageTitle from '@/Components/PageTitle';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';
import DataTable from 'react-data-table-component';

function SPartai(props) {
    var i = 1;
    const columns = [
        {
            name: "No",
            cell: (row) => i++,
            sortable: true,
            width: '8%'
        },
        {
            name: "Partai",
            selector: (row) => row.nama_partai,
            sortable: true,
        },
        {
            name: "TPS",
            selector: (row) => row.nama,
            sortable: true,
        },
        {
            name: "Caleg",
            selector: (row) => row.nama_calon,
            sortable: true,
        },
        {
            name: "Suara",
            selector: (row) => row.suara,
            sortable: true,
        },
    ];
    return (
        <DashboardLayout authe={props.auth} errors={props.errors} current_menu={props.page.toLowerCase()}>
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <PageTitle crumbs={`Home/Data Suara Partai`} title={`Data Suara Partai`} />
                    <Card title={'Data Suara Partai'}>
                        <DataTable columns={columns} data={props.data_tim_pemenangan} pagination/>
                    </Card>
                </div>
            </div>
        </div>
    </DashboardLayout>
    );
}

export default SPartai;