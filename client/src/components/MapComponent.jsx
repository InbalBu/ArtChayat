// MapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 51.505,
  lng: -0.09
};

const MapComponent = () => (
  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      <Marker position={center} />
    </GoogleMap>
  </LoadScript>
);

export default MapComponent;
