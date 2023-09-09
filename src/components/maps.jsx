"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = (props) => {
  const defaultCenter = { lat: -26.830529642928827, lng: -65.20473966027612 };
  const businessLocation = {
    lat: -26.830529642928827,
    lng: -65.20473966027612,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.mapsKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "50vh" }}
        zoom={15}
        center={defaultCenter}>
        <Marker position={businessLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
