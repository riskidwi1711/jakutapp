import Card from "@/Components/Card/Card";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import Iframe from "react-iframe";

function GisCapil(props) {
    return (
        <DashboardLayout
            authe={props.auth}
            errors={props.errors}
            current_menu={"capil"}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs="Home/Peta Data Kependudukan "
                            title="Peta Data"
                        />
                        <Card
                            title={"Peta Data Kependudukan Seluruh Indonesia"}
                        >
                            <Iframe
                                url="https://gis.dukcapil.kemendagri.go.id/peta/"
                                width="640px"
                                height="640px"
                                id=""
                                className=""
                                display="block"
                                position="relative"
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default GisCapil;
