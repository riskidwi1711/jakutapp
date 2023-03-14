import Card from '@/Components/Card/Card';
import PageTitle from '@/Components/PageTitle';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';

function WebSetting(props) {
    return (
        <DashboardLayout authe={props.auth} errors={props.errors} current_menu={'websetting'}>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle crumbs="Home/Web Setting" title="Pengaturan Situs" />
                        <Card title={'Pengaturan Tampilan'}>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default WebSetting;