
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locations } from "../data/locations";
import artIcon from '../assets/icon.png';
import shadowIcon from '../assets/shadow.png';
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const iconArt = new L.Icon({
  iconUrl: artIcon,
  iconRetinaUrl: artIcon,
  popupAnchor:  [-0, -13],
  iconSize: [46,46],     
  shadowUrl: shadowIcon,
  shadowAnchor: [13, 25],
});

const lat_long = [33.8617, 104.1954]

const Youtube = (resource) => {
  const videoId = resource.url.split("v=")[1].split("&")[0];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  return (
    <div style={{ textAlign: "center" }}>
      <a href={resource.url} target="_blank" style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src={thumbnailUrl}
          alt={resource.title}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </a>
    </div>
  );
};

const Map = () => {
  return (
    <MapContainer
      center={lat_long}
      zoom={4.7}
      style={{ height: "100vh" }}
    >
      <TileLayer
    attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
    url={`https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png&api_key=${import.meta.env.VITE_MAP_API}`}
  />
      {locations.map((location) => {

        return (
          <Marker position={[location.lat, location.lng]} key={location.name} icon={iconArt}>
            <Popup minWidth={350}>
              <h2>{location.name}</h2>
              {
                location.resources.map((resource) => {
                  if (resource.type === "youtube") {
                    return Youtube(resource);
                  }
                  if (resource.type === 'blog') {
                    return (
                      <div key={resource.title} style={{ margin: "10px 0" }}>
                        <a href={resource.url} target="_blank">
                          Blog: {resource.title}
                        </a>
                      </div>
                    )
                  }
                })
              }
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
