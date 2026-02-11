import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { latLng, latLngBounds, icon } from "leaflet";
import marker from "../assets/marker.svg";
import "./Karte.scss";

const attribution =
  '&copy; <a href="https://www.swisstopo.admin.ch">swisstopo</a>';
const wmtsMapUrl =
  "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg";
const wmtsImageUrl =
  "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg";
const position = latLng([47.533354, 7.639526]);
const bounds = latLngBounds([45.81, 10.5], [47.81, 5.95]);
const markerIcon = icon({
  iconUrl: marker,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

export function Karte() {
  return (
    <MapContainer
      center={position}
      maxBounds={bounds}
      maxBoundsViscosity={1}
      zoom={17}
      minZoom={8}
      maxZoom={18}
      scrollWheelZoom={true}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Karte" checked={true}>
          <TileLayer attribution={attribution} url={wmtsMapUrl} />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Luftbilder">
          <TileLayer attribution={attribution} url={wmtsImageUrl} />
        </LayersControl.BaseLayer>
      </LayersControl>
      <Marker position={position} icon={markerIcon}>
        <Popup>
          FHNW Grümpi 2026
          <br />
          Fussballplatz Kriegacker
        </Popup>
      </Marker>
    </MapContainer>
  );
}
