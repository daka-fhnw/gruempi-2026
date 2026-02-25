import { useEffect } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  ScaleControl,
  TileLayer,
  useMap,
} from "react-leaflet";
import { latLng, latLngBounds, icon } from "leaflet";
import marker_platz from "../assets/marker_platz.svg";
import marker_schule from "../assets/marker_schule.svg";
import marker_anreise from "../assets/marker_anreise.svg";
import "./Karte.scss";

const attribution =
  '&copy; <a href="https://www.swisstopo.admin.ch">swisstopo</a>';
const wmtsMapUrl =
  "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg";
const wmtsImageUrl =
  "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg";
const osmAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const wmtsOsmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const positionPlatz = latLng([47.533354, 7.639526]);
const positionFHNW = latLng([47.534698, 7.642384]);
const positionBhf = latLng([47.533598, 7.647865]);
const positionBus1 = latLng([47.534328, 7.639673]);
const positionBus2 = latLng([47.533981, 7.64297]);
const bounds = latLngBounds([45.81, 10.5], [47.81, 5.95]);
const markerPlatzIcon = createIcon(marker_platz);
const markerSchuleIcon = createIcon(marker_schule);
const markerAnreiseIcon = createIcon(marker_anreise);

function createIcon(markerPath: string) {
  return icon({
    iconUrl: markerPath,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -40],
  });
}

export function Karte() {
  return (
    <MapContainer
      center={positionBus2}
      maxBounds={bounds}
      maxBoundsViscosity={1}
      zoom={17}
      minZoom={8}
      maxZoom={18}
      scrollWheelZoom={true}
    >
      <KarteZoom />
      <ScaleControl position="bottomleft" metric={true} imperial={false} />
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Karte" checked={true}>
          <TileLayer attribution={attribution} url={wmtsMapUrl} />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Luftbilder">
          <TileLayer attribution={attribution} url={wmtsImageUrl} />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer attribution={osmAttribution} url={wmtsOsmUrl} />
        </LayersControl.BaseLayer>
      </LayersControl>
      <Marker position={positionPlatz} icon={markerPlatzIcon}>
        <Popup>
          <b>FHNW Grümpi 2026</b>
          <br />
          Fussballplatz Kriegacker
          <br />
          Gründenstrasse 32
        </Popup>
      </Marker>
      <Marker position={positionFHNW} icon={markerSchuleIcon}>
        <Popup>FHNW Campus Muttenz</Popup>
      </Marker>
      <Marker position={positionBhf} icon={markerAnreiseIcon}>
        <Popup>Bahnhof Muttenz</Popup>
      </Marker>
      <Marker position={positionBus1} icon={markerAnreiseIcon}>
        <Popup>
          Bushaltestelle
          <br />
          Muttenz, Kriegacker
        </Popup>
      </Marker>
      <Marker position={positionBus2} icon={markerAnreiseIcon}>
        <Popup>
          Bushaltestelle
          <br />
          Muttenz, Fachhochschule
        </Popup>
      </Marker>
    </MapContainer>
  );
}

function KarteZoom() {
  const map = useMap();
  useEffect(() => {
    const positions = [
      positionPlatz,
      positionFHNW,
      positionBhf,
      positionBus1,
      positionBus2,
    ];
    const markerBounds = positions[0].toBounds(0);
    for (const position of positions) {
      markerBounds.extend(position);
    }
    map.fitBounds(markerBounds, { padding: [25, 25] });
  }, [map]);
  return null;
}
