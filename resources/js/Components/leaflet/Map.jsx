import React, { useEffect, useMemo, useState } from "react";
import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
    Rectangle,
    Polygon,
    CircleMarker,
    Tooltip,
    GeoJSON,
} from "react-leaflet";
import Card from "../Card/Card";
import { features } from "../../Data/JAKU.json";
import { Link } from "@inertiajs/inertia-react";

function Map({
    data,
    title,
    suara,
    relawan,
    tps,
    saksis,
    tokoh,
    dcpt,
    korsak,
    korte,
    korwe,
    kelurahans,
    kortps,
    scrool,
    center,
}) {
    const [coordinates, setCoordinates] = useState([]);
    const [onselect, setOnselect] = useState({
        kelurahan: "",
        koed_rw: "",
        rw: "",
        saksi: 0,
        id_kel: "",
        tps: 0,
        korsaks: 0,
        kortpss: 0,
        kortes: 0,
        korwes: 0,
        dcpts: 0,
        tokohs: 0,
        kecamatan: "",
    });
    const [isload, setIsload] = useState(false);

    const filterDta = (data, state, kelurahan) => {
        let found = data.filter(
          (e) =>
            e.kel_nama.replace("Kelurahan", "").replace(" ", "").toLowerCase() ===
            kelurahan.toLowerCase()
        );
        if (found) {
          setOnselect((prv) => ({
            ...prv,
            [state]: found.length,
          }));
        }
      };
    
      const getData = (kelurahan, kecamatan, rw) => {
        setOnselect({
          ...onselect,
          kelurahan: kelurahan,
          kode_rw: rw,
          rw: rw,
          kecamatan: kecamatan,
        });
        kelurahans.map((e) => {
          if (
            kelurahan.toLowerCase() ===
            e.nama.replace("Kelurahan", "").replace(" ", "").toLowerCase()
          ) {
            setOnselect((prev) => ({
              ...prev,
              id_kel: e.id,
            }));
          }
        });
        filterDta(dcpt, "dcpts", kelurahan);
        filterDta(korsak, "korsaks", kelurahan);
        filterDta(korwe, "korwes", kelurahan);
        filterDta(korte, "kortes", kelurahan);
        filterDta(saksis, "saksi", kelurahan);
        filterDta(tokoh, "tokohs", kelurahan);
      };
    
      const highlightFeature = (e) => {
        var layer = e.target;
        const { KELURAHAN, KODE_RW, RW, KECAMATAN, total_tim } =
          e.target.feature.properties;
        getData(KELURAHAN, KECAMATAN, RW);
      };
    
      const change = (e) => {
        var layer = e.target;
        const { KELURAHAN, KODE_RW, RW, KECAMATAN, total_tim } =
          e.target.feature.properties;
        setOnselect({
          kelurahan: KELURAHAN,
          koed_rw: KODE_RW,
          rw: RW,
          kecamatan: KECAMATAN,
        });
        layer.setStyle({
          weight: 1,
          color: "black",
          fillOpacity: 1,
        });
      };
    const resetHighlight = (e) => {
        setOnselect({});
        e.target.setStyle(style(e.target.feature));
    };

    const onEachFeature = (feature, layer) => {
        layer.on({
            click: highlightFeature,
            mouseover: highlightFeature,
            onmouseleave: resetHighlight,
        });
    };


    const style = (feature) => {
        return {
            fillColor: mapPolygonColorToDensity(feature.properties.KELURAHAN),
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "2",
            fillOpacity: 0.5,
        };
    };

    const mapPolygonColorToDensity = (density) => {
        switch (density) {
            case "KAPUK MUARA":
                return "#00FF00";
            case "KAMAL MUARA":
                return "#FF00FF";
            case "PLUIT":
                return "#FFFF00";
            case "PEJAGALAN":
                return "#FF0066";
            case "PENJARINGAN":
                return "#6600FF";
            case "ANCOL":
                return "#663399";
            case "PADEMANGAN BARAT":
                return "#FF6666";
            case "PADEMANGAN TIMUR":
                return "#006600";
            case "SUNTER AGUNG":
                return "#9900CC";
            case "PAPANGGO":
                return "#330066";
            case "SUNGAI BAMBU":
                return "#00FF00";
            case "WARAKAS":
                return "#FF3366";
            case "TANJUNG PRIOK":
                return "#99CC66";
            case "SUNTER JAYA":
                return "#336633";
            case "KEBON BAWANG":
                return "#666666";
            case "RAWA BADAK UTARA":
                return "#660066";
            case "KOJA":
                return "#663366";
            case "SEMPER TIMUR":
                return "#339900";
            case "LAGOA":
                return "#FF6633";
            case "KALIBARU":
                return "#FF9999";
            case "TUGU UTARA":
                return "#3366FF";
            case "CILINCING":
                return "#663399";
            case "MARUNDA":
                return "#996666";
            case "ROROTAN":
                return "#330099";
            case "SEMPER BARAT":
                return "#990000";
            case "SUKAPURA":
                return "#330033";
            case "TUGU SELATAN":
                return "#9999FF";
            default:
                return "#00CCCC";
        }
    };

    return (
        <MapContainer
            scrollWheelZoom={scrool}
            bounds={coordinates}
            zoom={12}
            center={center ? center : [-6.1280857, 106.8448651]}
            boundsOptions={{ padding: [1, 1] }}
            style={{ height: "70vh", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Caveman Software Solution</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {features && (
                <GeoJSON
                    onEachFeature={onEachFeature}
                    style={style}
                    data={
                        data
                            ? features.filter(
                                  (e) => e.properties.KECAMATAN === data
                              )
                            : features
                    }
                >
                    <Popup position="center m-0" maxHeight={350}>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Nama Properti</th>
                                    <th scope="col">Value</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Kecamatan</td>
                                    <td>{onselect.kecamatan}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Kelurahan</td>
                                    <td>{onselect.kelurahan}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>RW</td>
                                    <td>{onselect.rw}</td>
                                    <td></td>
                                </tr>
                                {/* <tr>
                                    <td>Jumlah TPS</td>
                                    <td>{onselect.tps}</td>
                                    <td>
                                        <a className="" href="">
                                            <i className="fas fa-eye text-primary"></i>
                                        </a>
                                    </td>
                                </tr> */}
                                <tr>
                                    <td>Jumlah Saksi</td>
                                    <td>{onselect.saksi}</td>
                                    <td>
                                        <Link
                                            href={`/data/kel/saksi/${onselect.id_kel}`}
                                        >
                                            <i className="fas fa-eye text-primary"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jumlah Korsak</td>
                                    <td>{onselect.korsaks}</td>
                                    <td>
                                        <Link
                                            href={`/data/kel/korsak/${onselect.id_kel}`}
                                        >
                                            <i className="fas fa-eye text-primary"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jumlah Korwe</td>
                                    <td>{onselect.korwes}</td>
                                    <td>
                                        <Link
                                            href={`/data/kel/korwe/${onselect.id_kel}`}
                                        >
                                            <i className="fas fa-eye text-primary"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jumlah korte</td>
                                    <td>{onselect.kortes}</td>
                                    <td>
                                        <Link
                                            href={`/data/kel/korte/${onselect.id_kel}`}
                                        >
                                            <i className="fas fa-eye text-primary"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jumlah kortps</td>
                                    <td>{onselect.kortpss}</td>
                                    <td>
                                        <Link
                                            href={`/data/kel/kortps/${onselect.id_kel}`}
                                        >
                                            <i className="fas fa-eye text-primary"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jumlah Calon Pemilih</td>
                                    <td>{onselect.dcpts}</td>
                                    <td>
                                        <Link
                                            href={`/data/kel/pemilih/${onselect.id_kel}`}
                                        >
                                            <i className="fas fa-eye text-primary"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jumlah Tokoh</td>
                                    <td>{onselect.tokohs}</td>
                                    <td>
                                        <Link
                                            href={`/data/kel/tokoh/${onselect.id_kel}`}
                                        >
                                            <i className="fas fa-eye text-primary"></i>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Popup>
                    <Tooltip>{onselect.kelurahan} | RW: {onselect.rw} </Tooltip>
                </GeoJSON>
            )}
        </MapContainer>
    );
}

export default Map;
