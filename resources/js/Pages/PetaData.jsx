import Card from "@/Components/Card/Card";
import CardMini from "@/Components/Card/CardMini";
import { ChartBar } from "@/Components/Chart/BarChart";
import Col from "@/Components/Col/Col";
import Row from "@/Components/Col/Row";
import Map from "@/Components/leaflet/Map";
import PageTitle from "@/Components/PageTitle";
import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout";

function PetaData(props) {
  return (
    <DashboardLayout
      authe={props.auth}
      errors={props.errors}
      current_menu="petadata"
    >
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <PageTitle crumbs="Home/Peta Data" title="Peta Data" />
            <Row>
              <Col vw={"col-lg-12"}>
                <Card title={"Peta Data Jakarta Utara"}>
                  <div>
                    <Map
                      scrool={true}
                      data={null}
                      title="Pluit"
                      suara="1000"
                      relawan="10"
                      tps={props.tps}
                      saksis={props.saksi}
                      korsak={props.korsak}
                      korwe={props.korwe}
                      korte={props.korte}
                      kelurahans={props.kelurahan}
                      kortps={props.kortps}
                      dcpt={props.dcpt}
                      tokoh={props.tokoh}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col vw={"col-lg-6"}>
                <Card title={"Peta Data Jakarta Utara Kecamatan Koja"}>
                  <div>
                    <Map
                      center={[-6.1205, 106.907]}
                      scrool={true}
                      data={"KOJA"}
                      title="Pluit"
                      suara="1000"
                      relawan="10"
                      tps={props.tps}
                      saksis={props.saksi}
                      korsak={props.korsak}
                      korwe={props.korwe}
                      korte={props.korte}
                      kelurahans={props.kelurahan}
                      kortps={props.kortps}
                      dcpt={props.dcpt}
                      tokoh={props.tokoh}
                    />
                  </div>
                </Card>
              </Col>
              <Col vw={"col-lg-6"}>
                <Card title={"Peta Data Jakarta Utara Kecamatan Penjaringan"}>
                  <div>
                    <Map
                      center={[-6.1148, 106.7972]}
                      scrool={true}
                      data={"PENJARINGAN"}
                      title="Pluit"
                      suara="1000"
                      relawan="10"
                      tps={props.tps}
                      saksis={props.saksi}
                      korsak={props.korsak}
                      korwe={props.korwe}
                      korte={props.korte}
                      kelurahans={props.kelurahan}
                      kortps={props.kortps}
                      dcpt={props.dcpt}
                      tokoh={props.tokoh}
                    />
                  </div>
                </Card>
              </Col>
              <Col vw={"col-lg-6"}>
                <Card title={"Peta Data Jakarta Utara Kecamatan Pademangan"}>
                  <div>
                    <Map
                      center={[-6.1291, 106.8405]}
                      scrool={true}
                      data={"PADEMANGAN"}
                      title="Pluit"
                      suara="1000"
                      relawan="10"
                      tps={props.tps}
                      saksis={props.saksi}
                      korsak={props.korsak}
                      korwe={props.korwe}
                      korte={props.korte}
                      kelurahans={props.kelurahan}
                      kortps={props.kortps}
                      dcpt={props.dcpt}
                      tokoh={props.tokoh}
                    />
                  </div>
                </Card>
              </Col>
              <Col vw={"col-lg-6"}>
                <Card title={"Peta Data Jakarta Utara Kecamatan Kelapa Gading"}>
                  <div>
                    <Map
                      center={[-6.16, 106.9006]}
                      scrool={true}
                      data={"KELAPA GADING"}
                      title="Pluit"
                      suara="1000"
                      relawan="10"
                      tps={props.tps}
                      saksis={props.saksi}
                      korsak={props.korsak}
                      korwe={props.korwe}
                      kelurahans={props.kelurahan}
                      korte={props.korte}
                      kortps={props.kortps}
                      dcpt={props.dcpt}
                      tokoh={props.tokoh}
                    />
                  </div>
                </Card>
              </Col>
              <Col vw={"col-lg-6"}>
                <Card title={"Peta Data Jakarta Utara Kecamatan Tanjung Priok"}>
                  <div>
                    <Map
                      center={[-6.1298, 106.8709]}
                      scrool={true}
                      data={"TANJUNG PRIOK"}
                      title="Pluit"
                      suara="1000"
                      relawan="10"
                      tps={props.tps}
                      saksis={props.saksi}
                      korsak={props.korsak}
                      korwe={props.korwe}
                      korte={props.korte}
                      kortps={props.kortps}
                      kelurahans={props.kelurahan}
                      dcpt={props.dcpt}
                      tokoh={props.tokoh}
                    />
                  </div>
                </Card>
              </Col>
              <Col vw={"col-lg-6"}>
                <Card title={"Peta Data Jakarta Utara Kecamatan Cilincing"}>
                  <div>
                    <Map
                      center={[-6.1199, 106.9363]}
                      scrool={true}
                      data={"CILINCING"}
                      title="Pluit"
                      suara="1000"
                      relawan="10"
                      tps={props.tps}
                      saksis={props.saksi}
                      korsak={props.korsak}
                      korwe={props.korwe}
                      kelurahans={props.kelurahan}
                      korte={props.korte}
                      kortps={props.kortps}
                      dcpt={props.dcpt}
                      tokoh={props.tokoh}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PetaData;
