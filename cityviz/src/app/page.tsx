"use client";
import { useState, useEffect } from "react";
import Map from "./components/map";
import Chart from "./components/chart";
import BoroughChart from "./components/BoroughChart";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">NYC 311 Service Requests</h1>
      <Map />

      <div className={`mt-16 flex ${isMobile ? "flex-col" : "flex-row"} gap-8`}>
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Complaints Over Time</h2>
          <Chart />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Complaints by Borough</h2>
          <BoroughChart />
        </div>
      </div>
    </div>
  );
}
