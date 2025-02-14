"use client";

import { useEffect, useState } from "react";

interface NYC311Request {
  unique_key: string;
  complaint_type: string;
  descriptor?: string;
  status: string;
  created_date: string;
  resolution_description?: string;
  incident_address?: string;
}

export default function DataFetcher() {
  const [data, setData] = useState<NYC311Request[]>([]);

  useEffect(() => {
    const fetchNYCData = async () => {
      try {
        const response = await fetch(
          "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=5"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const jsonData: NYC311Request[] = await response.json();
        console.log(jsonData); // Check data structure in console
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching NYC data:", error);
      }
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
