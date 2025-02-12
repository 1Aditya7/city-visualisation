import Map from "././components/map";
import Chart from "././components/chart";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">NYC 311 Service Requests</h1>
      <Map />
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Complaints Over Time</h2>
        <Chart />
      </div>
    </div>
  );
}
