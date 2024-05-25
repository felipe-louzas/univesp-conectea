'use client';

import { Registro } from "@/modules/firebase/models/Registro";
import DashboardWidget from "./DashboardWidget";

import Map, { GeolocateControl, Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import sample from './geo.json';
import React from "react";
import { Button, Card } from "@mui/material";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function EventMapWidget({ data }: { data: Registro[] }) {
    const [selectedMarker, setSelectedMarker] = React.useState<number | null>(null);

    const showPopup = selectedMarker !== null;
    const popupLocation = showPopup ? {
        long: sample.features[selectedMarker].geometry.coordinates[0],
        lat: sample.features[selectedMarker].geometry.coordinates[1]
    } : null;

    console.log(selectedMarker, showPopup, popupLocation);

    const selectedRegistro = showPopup ? data[selectedMarker % data.length] : null;

    return (
        <DashboardWidget title="Localização">
            <Map
                mapboxAccessToken={mapboxToken}
                mapStyle="mapbox://styles/mapbox/light-v11"
                initialViewState={{ latitude: -23.547245810416847, longitude: -46.57287303041889, zoom: 13 }}
                maxZoom={20}
                minZoom={3}
            >
                {sample.features.map((feature, index) => (
                    <Marker key={index} latitude={feature.geometry.coordinates[1]} longitude={feature.geometry.coordinates[0]}  onClick={(e) => setSelectedMarker(index)}>
                    </Marker>
                ))}

                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />

                {showPopup && (
                    <Popup longitude={popupLocation!.long} latitude={popupLocation!.lat}
                        anchor="bottom"
                        onClose={() => { setSelectedMarker(null) }}
                        closeOnClick={false}>
                        <p>{selectedRegistro!.data.toLocaleString()}</p>
                        <p>{selectedRegistro!.ocorrencia}   </p>
                    </Popup>)}
            </Map>
        </DashboardWidget>
    )
}