"use client";

import { useEffect, useState } from "react";

export default function DataFetcher() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchNYCData = async () => {
      const response = await fetch(
        "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=5"
      );
      const jsonData = await response.json();
      console.log(jsonData); // Check data structure in console
      setData(jsonData);
    };

    fetchNYCData();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Sample 311 Requests</h2>
      <pre className="bg-gray-100 p-2 rounded-md text-xs">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
