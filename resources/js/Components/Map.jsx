import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
function Map(props) {
    const mapEl = useRef(null);

    useEffect(() => {
        let view;
        loadModules(
            [
                "esri/views/MapView",
                "esri/WebMap",
                "esri/layers/GeoJSONLayer"
            ],
            {
                css: true,
            }
        ).then(([MapView, WebMap, GeoJSONLayer]) => {
            const webMap = new WebMap({
                basemap: "gray-vector",
            });

            var view = new MapView({
                map: webMap,
                center: [106.826130, -6.172145],
                zoom: 12,
                container: mapEl.current,
            });

            const geojsonlayer = new GeoJSONLayer({
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
                copyright: "USGS Earthquakes",
            });

            webMap.add(geojsonlayer);
        });

        return () => {
            if (!!view) {
                view.destroy();
                view = null;
            }
        };
    });
    return <div style={{ height: 800 }} ref={mapEl}></div>;
}

export default Map;
