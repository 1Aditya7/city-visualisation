"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Feature, FeatureCollection, Point } from "geojson";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

// Define API response structure
interface NYCComplaint {
  latitude: string;
  longitude: string;
  complaint_type: string;
  incident_address: string;
}

// Define complaint properties explicitly
interface ComplaintProperties {
  complaint: string;
  address: string;
}

// Define complaint feature structure
interface ComplaintFeature extends Feature<Point, ComplaintProperties> {
  geometry: Point;
  properties: ComplaintProperties;
}

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [geojson, setGeojson] = useState<FeatureCollection<Point, ComplaintProperties> | null>(null);

  useEffect(() => {
    const fetchNYCData = async () => {
      try {
        const response = await fetch(
          "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=500"
        );
        const jsonData: NYCComplaint[] = await response.json();

        const features: ComplaintFeature[] = jsonData
          .filter((request) => request.latitude && request.longitude)
          .map((request) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [parseFloat(request.longitude), parseFloat(request.latitude)],
            },
            properties: {
              complaint: request.complaint_type || "Unknown Complaint",
              address: request.incident_address || "Unknown Address",
            },
          }));

        setGeojson({ type: "FeatureCollection", features });
      } catch (error) {
        console.error("Error fetching NYC data:", error);
      }
    };

    fetchNYCData();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !geojson) return;

    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-74.006, 40.7128], // NYC
      zoom: 11,
    });

    newMap.on("load", () => {
      newMap.addSource("complaints", {
        type: "geojson",
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      newMap.addLayer({
        id: "clusters",
        type: "circle",
        source: "complaints",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": ["step", ["get", "point_count"], "#51bbd6", 10, "#f1f075", 50, "#f28cb1"],
          "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 50, 25],
        },
      });

      newMap.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "complaints",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      newMap.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "complaints",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#ff0000",
          "circle-radius": 6,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      newMap.on("click", "unclustered-point", (e) => {
        const features = newMap.queryRenderedFeatures(e.point, { layers: ["unclustered-point"] });

        if (!features.length) return;

        const feature = features[0];

        if (!feature.geometry || feature.geometry.type !== "Point" || !feature.properties) {
          console.error("Feature missing expected properties:", feature);
          return;
        }

        // Ensure coordinates are exactly [number, number]
        const coordinates: [number, number] = feature.geometry.coordinates as [number, number];
        const complaint = feature.properties.complaint || "Unknown Complaint";
        const address = feature.properties.address || "Unknown Address";

        new mapboxgl.Popup({ offset: [30, 0], closeOnClick: true })
          .setLngLat(coordinates)
          .setHTML(`<strong>${complaint}</strong><br>${address}`)
          .addTo(newMap);
      });

      newMap.on("mouseenter", "unclustered-point", () => {
        newMap.getCanvas().style.cursor = "pointer";
      });

      newMap.on("mouseleave", "unclustered-point", () => {
        newMap.getCanvas().style.cursor = "";
      });
    });

    return () => newMap.remove();
  }, [geojson]);

  return <div ref={mapContainerRef} className="w-full h-[500px]" />;
}
