import Map from "./components/map";
import Chart from "./components/chart";
import BoroughChart from "./components/BoroughChart";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">NYC 311 Service Requests</h1>
      <Map />

      <div className="mt-16 flex flex-row gap-8">
        {/* Complaints Over Time */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Complaints Over Time</h2>
          <Chart />
        </div>

        {/* Complaints by Borough */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Complaints by Borough</h2>
          <BoroughChart />
        </div>
      </div>
    </div>
  );
}
