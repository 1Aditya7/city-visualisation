import Map from "././components/map";
import DataFetcher from "././components/dataFetch";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">NYC 311 Service Requests</h1>
      <Map />
      <DataFetcher />
    </div>
  );
}
