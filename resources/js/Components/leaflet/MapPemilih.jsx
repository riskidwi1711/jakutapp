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
import { features } from "../../Data/Pemilih.json";
import { Link } from "@inertiajs/inertia-react";
import L from "leaflet"
import Legend from "./Legend";

function MapPemilih({
  data,
  title,
  suara,
  relawan,
  all,
  tps,
  saksis,
  tokoh,
  dcpt,
  korsak,
  kelurahans,
  korte,
  korwe,
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
  let dataMap = features;

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

    let found = dcpt.filter(
      (e) =>
        e.kel_nama.replace("Kelurahan", "").replace(" ", "").toLowerCase() ===
        kelurahan.toLowerCase()
    );

    if (found) {
      console.log(found);
      setOnselect((prev) => ({
        ...prev,
        dcpts: found.length,
      }));
    }
  };
  const highlightFeature = (e) => {
    var layer = e.target;
    const { KELURAHAN, KODE_RW, RW, KECAMATAN, total_tim } =
      e.target.feature.properties;
    setOnselect({
      kelurahan: KELURAHAN,
      koed_rw: KODE_RW,
      rw: RW,
      saksi: 0,
      tps: 0,
      korsaks: 0,
      kortpss: 0,
      kortes: 0,
      korwes: 0,
      dcpts: 0,
      tokohs: 0,
      kecamatan: KECAMATAN,
    });
    getData(KELURAHAN, KECAMATAN, RW);
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
    });
  };

  const style = (feature) => {
    return {
      fillColor: mapPolygonColorToDensity(feature.properties.total_tim),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "2",
      fillOpacity: 0.5,
    };
  };

  useEffect(() => {
    features.map((el) => {
      el.properties.total_tim = all.filter(
        (fil) =>
          fil.kel_nama
            .replace("Kelurahan", "")
            .replace(" ", "")
            .toLowerCase() === el.properties.KELURAHAN.toLowerCase()
      ).length;
    });
  });

  const mapPolygonColorToDensity = (totalTim) => {
    if (totalTim < 50) {
        return "#FF3232";
      } else if (totalTim < 75 && totalTim >= 50) {
        return "#FFA700";
      } else if (totalTim < 100 && totalTim >= 75) {
        return "#F2FF2F";
      } else if (totalTim < 125 && totalTim >= 100) {
        return "#00FF00";
      } else if (totalTim < 150 && totalTim >= 125) {
        return "#00CC00";
      } else if (totalTim < 175 && totalTim >= 150) {
        return "#00AA00";
      } else if (totalTim < 200 && totalTim >= 175) {
        return "#008800";
      } else if (totalTim < 225 && totalTim >= 200) {
        return "#006600";
      } else if (totalTim < 250 && totalTim >= 225) {
        return "#004400";
      } else if (totalTim < 275 && totalTim >= 250) {
        return "#002200";
      } else if (totalTim < 300 && totalTim >= 275) {
        return "#000022";
      } else if (totalTim >= 300) {
        return "#01411C";
      }
  };

  const [map, setmap] = useState(null)

  return (
    <MapContainer
      scrollWheelZoom={scrool}
      bounds={coordinates}
      zoom={12}
      whenReady={setmap}
      closePopupOnClick={true}
      bounceAtZoomLimits={true}
      zoomSnap={0.5}
      center={center ? center : [-6.1280857, 106.8448651]}
      boundsOptions={{ padding: [1, 1] }}
      style={{ height: "70vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Caveman Software Solution</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {dataMap && (
        <GeoJSON
          onEachFeature={onEachFeature}
          style={style}
          data={
            data
              ? dataMap.filter((e) => e.properties.KECAMATAN === data)
              : dataMap
          }
        >
          <Tooltip>
            {onselect.kelurahan} | RW: {onselect.rw} | Jumlah Pemilih: {onselect.dcpts}
          </Tooltip>
          <Popup permanent position="topright m-0" maxHeight={350}>
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
                <tr>
                  <td>Jumlah Calon Pemilih</td>
                  <td>{onselect.dcpts}</td>
                  <td>
                    <Link href={`/data/kel/pemilih/${onselect.id_kel}`}>
                      <i className="fas fa-eye text-primary"></i>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </Popup>
        </GeoJSON>
      )}
    </MapContainer>
  );
}

export default MapPemilih;
