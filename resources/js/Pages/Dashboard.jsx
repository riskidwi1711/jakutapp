import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Card from "@/Components/Card/Card";
import Col from "@/Components/Col/Col";
import Row from "@/Components/Col/Row";
import PageTitle from "@/Components/PageTitle";
import CardMini from "@/Components/Card/CardMini";
import ButtonMenu from "@/Components/ButtonMenu";
import Map from "@/Components/leaflet/Map";
import Mapsec from "@/Components/leaflet/Mapsec";
import Toast from "@/Components/Toast";
import MapPemilih from "@/Components/leaflet/MapPemilih";

export default function Dashboard(props) {


  return (
    <DashboardLayout
      authe={props.auth}
      errors={props.errors}
      current_menu="dashboard"
    >
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <PageTitle crumbs="Home/Dashboard" title="Selamat Datang !" />

            <Row>
              <Col vw="col-xl-12">
                {/* <Row>
                                    <Col vw={"col-md-3"}>
                                        <CardMini
                                            data={"tps"}
                                            title={"Data TPS"}
                                            value={props.tps.length}
                                            icons={"bxs-data"}
                                        />
                                    </Col>
                                    <Col vw={"col-md-3"}>
                                        <CardMini
                                            data={"partai"}
                                            title={"Data Partai"}
                                            value={props.partai.length}
                                            icons={"bxs-data"}
                                        />
                                    </Col>
                                    <Col vw={"col-md-3"}>
                                        <CardMini
                                            data={"data_masuk"}
                                            title={"Data Suara Partai Masuk"}
                                            value={props.data_masuk}
                                            icons={"bxs-data"}
                                        />
                                    </Col>
                                    <Col vw={"col-md-3"}>
                                        <CardMini
                                            data={"data_masuk"}
                                            title={"Data Suara Calon Masuk"}
                                            value={props.data_masuk}
                                            icons={"bxs-data"}
                                        />
                                    </Col>
                                </Row> */}
                <Row>
                  <Col vw={"col-md-3"}>
                    <CardMini
                      data={"KORSAK"}
                      title={"KORSAK"}
                      value={props.korsak.length}
                      icons={"bxs-user"}
                    />
                  </Col>
                  <Col vw={"col-md-3"}>
                    <CardMini
                      data={"KORWE"}
                      title={"KORWE"}
                      value={props.korwe.length}
                      icons={"bxs-user"}
                    />
                  </Col>
                  <Col vw={"col-md-3"}>
                    <CardMini
                      data={"KORTE"}
                      title={"KORTE"}
                      value={props.korte.length}
                      icons={"bxs-user"}
                    />
                  </Col>
                  <Col vw={"col-md-3"}>
                    <CardMini
                      data={"SAKSI"}
                      title={"SAKSI"}
                      value={props.saksi.length}
                      icons={"bxs-user"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Card title={"Peta Data Jakarta Utara"}>
                    <div>
                      <Map
                        scrool={false}
                        data={null}
                        title=""
                        suara="1000"
                        relawan="10"
                        tps={props.peta_tps}
                        saksis={props.peta_saksi}
                        korsak={props.peta_korsak}
                        korwe={props.peta_korwe}
                        kelurahans={props.kelurahan}
                        korte={props.peta_korte}
                        kortps={props.peta_kortps}
                        dcpt={props.peta_dcpt}
                        tokoh={props.peta_tokoh}
                      />
                    </div>
                  </Card>
                </Row>
                <Row>
                  <Card title={"Peta Sebaran Tim Pemenangan"}>
                    <div>
                      <Mapsec
                        all={props.all}
                        scrool={false}
                        data={null}
                        title=""
                        suara="1000"
                        relawan="10"
                        tps={props.peta_tps}
                        saksis={props.peta_saksi}
                        korsak={props.peta_korsak}
                        korwe={props.peta_korwe}
                        korte={props.peta_korte}
                        kortps={props.peta_kortps}
                        kelurahans={props.kelurahan}
                        dcpt={props.peta_dcpt}
                        tokoh={props.peta_tokoh}
                      />
                    </div>
                  </Card>
                </Row>
                <Row>
                  <Card title={"Peta Sebaran Calon Pemilih"}>
                    <div>
                      <MapPemilih
                        all={props.all}
                        scrool={false}
                        data={null}
                        title=""
                        suara="1000"
                        relawan="10"
                        kelurahans={props.kelurahan}
                        tps={props.peta_tps}
                        saksis={props.peta_saksi}
                        korsak={props.peta_korsak}
                        korwe={props.peta_korwe}
                        korte={props.peta_korte}
                        kortps={props.peta_kortps}
                        dcpt={props.peta_dcpt}
                        tokoh={props.peta_tokoh}
                      />
                    </div>
                  </Card>
                </Row>
                <Row>
                  <Col vw={"col-md-12"}>
                    <Card title={"Menu Wilayah"}>
                      <div className="d-flex flex-column">
                        <p>Silahkan pilih menu berikut :</p>
                        <div className="row">
                          <div className="col-6">
                            <ButtonMenu
                              val={props.kecamatan.length}
                              href={"/datawilayah/kecamatan"}
                              title={"Kecamatan"}
                              icon={"fa-map-marker"}
                              color={"btn-primary"}
                            />
                          </div>
                          <div className="col-6">
                            <ButtonMenu
                              val={props.kelurahan.length}
                              href={"/datawilayah/kelurahan"}
                              title={"Kelurahan"}
                              icon={"fa-map-marker"}
                              color={"btn-info"}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  {/* <Col vw={"col-md-6"}>
                    <Card title={"Menu Data Master"}>
                      <div className="d-flex flex-column">
                        <p>Silahkan pilih menu berikut :</p>
                        <div className="row">
                          <div className="col-4 mb-2">
                            <ButtonMenu
                              val={props.partai.length}
                              href={"/datatable/partai"}
                              title={"Partai"}
                              icon={"fa-flag"}
                              color={"btn-primary"}
                            />
                          </div>
                          <div className="col-4 mb-2">
                            <ButtonMenu
                              val={props.dprri.length}
                              href={"/datatable/caleg-dprri"}
                              title={"Caleg DPR RI"}
                              icon={"fa-map-marker"}
                              color={"btn-info"}
                            />
                          </div>
                          <div className="col-4 mb-2">
                            <ButtonMenu
                              val={props.dpd.length}
                              href={"/datatable/caleg-dpd"}
                              title={"Caleg DPD"}
                              icon={"fa-map-marker"}
                              color={"btn-warning"}
                            />
                          </div>
                          <div className="col-4 mb-2">
                            <ButtonMenu
                              val={props.dprd.length}
                              href={"/datatable/caleg-dprd-pro"}
                              title={"Caleg DPRD PRO"}
                              icon={"fa-map-marker"}
                              color={"btn-success"}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col> */}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
