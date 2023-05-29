import Card from '@/Components/Card/Card';
import PageTitle from '@/Components/PageTitle';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

function WaBot(props) {
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
    return (
        <DashboardLayout authe={props.auth} errors={props.errors} current_menu={'wa-setting'}>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle crumbs="Home/Bot Setting" title="Pengaturan Bot WhatsApp" />
                        <Card title={'Bot Whatsapp'}>
                            <form onSubmit={handleSubmit}>
                            {
                                props.data.map(e=>{
                                    return <div className='form-group'>
                                    <label htmlFor="" className=''>Bot API Key</label>
                                    <input type={e.input_type} onChange={(e)=>setbot_api(e.target.value)} name={e.setting_type} placeholder={e.value} className='form-control'/>
                                </div>
                                })
                            }
                            <div className='mt-4'>
                                <button className='btn btn-primary'>Simpan</button>
                            </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default WaBot;