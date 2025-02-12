"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchNYCData = async () => {
      const response = await fetch(
        "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=100"
      );
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchNYCData();

    if (!mapContainerRef.current) return;

    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-74.006, 40.7128], // NYC
      zoom: 11,
    });

    setMap(newMap);
    return () => newMap.remove();
  }, []);

  useEffect(() => {
    if (!map || data.length === 0) return;

    data.forEach((request) => {
      if (!request.latitude || !request.longitude) return;

      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `${request.complaint_type} at ${request.incident_address || "Unknown Address"}`
      );

      new mapboxgl.Marker({ color: "red" })
        .setLngLat([parseFloat(request.longitude), parseFloat(request.latitude)])
        .setPopup(popup)
        .addTo(map);
    });
  }, [map, data]);

  return <div ref={mapContainerRef} className="w-full h-[500px]" />;
}
