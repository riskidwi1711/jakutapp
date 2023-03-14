import Card from "@/Components/Card/Card";
import ChartCalon from "@/Components/Chart/ChartCalon";
import ChartDapil from "@/Components/Chart/ChartDapil";
import { ChartPie } from "@/Components/Chart/PieChart";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";

function Detail(props) {
    console.log(props);
    return (
        <DashboardLayout
            authe={props.auth}
            errors={props.errors}
            current_menu={`data${props.param}`}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle
                            crumbs={`Home/Data Wilayah/${props.param}`}
                            title={`Data  ${
                                props.param === "kecamatan"
                                    ? props.kecamatan.nama
                                    : props.param === "kelurahan"
                                    ? props.jumlah_kelurahan[0].nama
                                    : props.param === "tps"
                                    ? props.jumlah_tps[0].nama
                                    : ""
                            }`}
                        />
                        <Card
                            title={`Table Data Wilayah ${
                                props.param === "kecamatan"
                                    ? props.kecamatan.nama
                                    : props.param === "kelurahan"
                                    ? props.jumlah_kelurahan[0].nama
                                    : props.param === "tps"
                                    ? props.jumlah_tps[0].nama
                                    : ""
                            }`}
                        >
                            <table class="table table-striped ">
                                <tbody>
                                    <tr>
                                        <th
                                            scope="row"
                                            style={{ width: 20 + "%" }}
                                        >
                                            Nama Provinsi
                                        </th>
                                        <td>DKI Jakarta</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Nama Kab/Kota</th>
                                        <td>Jakarta Utara</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Nama Kecamatan</th>
                                        <td>{props.jumlah_tps[0].kecamatan}</td>
                                    </tr>
                                    {props.param === "kecamatan" ? (
                                        <tr>
                                            <th scope="row">
                                                Jumlah Kelurahan
                                            </th>
                                            <td>
                                                {props.jumlah_kelurahan.length}
                                            </td>
                                        </tr>
                                    ) : props.param === "kelurahan" ? (
                                        <tr>
                                            <th scope="row">Nama Kelurahan</th>
                                            <td>
                                                {props.jumlah_kelurahan[0].nama}
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <th scope="row">Nama Kelurahan</th>
                                            <td>
                                                {props.jumlah_kelurahan[0].nama}
                                            </td>
                                        </tr>
                                    )}
                                    {props.param === "kecamatan" ? (
                                        <tr>
                                            <th scope="row">Jumlah TPS</th>
                                            <td>{props.jumlah_tps.length}</td>
                                        </tr>
                                    ) : props.param === "kelurahan" ? (
                                        <tr>
                                            <th scope="row">Jumlah TPS</th>
                                            <td>{props.jumlah_tps.length}</td>
                                        </tr>
                                    ) : props.param === "tps" ? (
                                        <tr>
                                            <th scope="row">Nama TPS</th>
                                            <td>{props.jumlah_tps[0].nama}</td>
                                        </tr>
                                    ) : (
                                        ""
                                    )}
                                </tbody>
                            </table>
                        </Card>
                        <Card>
                            <div className="d-flex justify-content-center align-items-center">
                                <div style={{ width: 500 + "px" }}>
                                    <ChartPie data = {props.chart_presiden}/>
                                </div>
                            </div>
                        </Card>
                        <Card title={"Chart Data Per Partai"}>
                            {props.chart_partai.data.length < 1 ? (
                                <p>Data tidak ada</p>
                            ) : (
                                <ChartDapil
                                    datas={props.chart_partai}
                                    title={`Hasil Hitung Suara DPR RI`}
                                />
                            )}
                        </Card>
                        <Card title={"Chart Data Per Calon"}>
                            {props.chart_calon.data.length < 1 ? (
                                <p>Data tidak ada</p>
                            ) : (
                                <ChartCalon
                                    datas={props.chart_calon}
                                    title={`Hasil Hitung Suara DPR RI`}
                                />
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Detail;
