"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type ServiceRequest = {
  borough?: string; // Borough might be missing in some cases
};

export default function BoroughChart() {
  const [data, setData] = useState<{ borough: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=500");
      const jsonData = await response.json();

      const grouped = jsonData.reduce((acc: Record<string, number>, request: ServiceRequest) => {
        const borough = request.borough || "Unknown";
        acc[borough] = (acc[borough] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setData(Object.entries(grouped).map(([borough, count]) => ({ borough, count: Number(count) })));
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="borough" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
