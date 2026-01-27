import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import marker from "../assets/marker.svg";
import "./Karte.scss";

const ATTRIBUTION =
  '&copy; <a href="https://www.swisstopo.admin.ch/en/home.html">swisstopo</a>';
const WMTS_MAP =
  "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg";
const WMTS_IMAGE =
  "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg";
const LOCATION = L.latLng([47.533354, 7.639526]);
const BOUNDS = L.latLngBounds([45.81, 10.5], [47.81, 5.95]);
const ICON = L.icon({
  iconUrl: marker,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

export default function Karte() {
  return (
    <MapContainer
      center={LOCATION}
      maxBounds={BOUNDS}
      maxBoundsViscosity={1}
      zoom={17}
      minZoom={8}
      maxZoom={18}
      scrollWheelZoom={true}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Karte" checked={true}>
          <TileLayer attribution={ATTRIBUTION} url={WMTS_MAP} />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Luftbilder">
          <TileLayer attribution={ATTRIBUTION} url={WMTS_IMAGE} />
        </LayersControl.BaseLayer>
      </LayersControl>
      <Marker position={LOCATION} icon={ICON}>
        <Popup>
          FHNW Grümpi 2026
          <br />
          Fussballplatz Kriegacker
        </Popup>
      </Marker>
    </MapContainer>
  );
}
