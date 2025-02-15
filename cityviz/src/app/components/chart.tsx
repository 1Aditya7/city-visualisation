"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import styled from "styled-components";

// Define a type for 311 service request data
type ServiceRequest = {
  created_date: string;
};

type ChartData = { date: string; count: number };

export default function Chart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchNYCData = async () => {
      const response = await fetch(
        "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=500"
      );
      const jsonData: ServiceRequest[] = await response.json();

      const grouped = jsonData.reduce((acc, request) => {
        const date = request.created_date.split("T")[0]; // Extract date only
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const formattedData = Object.entries(grouped).map(([date, count]) => ({ date, count }));
      setData(formattedData);
    };

    fetchNYCData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#3182CE" animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Define Tooltip Props
interface TooltipProps {
  active?: boolean;
  payload?: { payload: { date: string }; value: number }[];
}

// Custom Tooltip
const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <TooltipContainer>
      <p>{payload[0].payload.date}</p>
      <p>Complaints: {payload[0].value}</p>
    </TooltipContainer>
  );
};

// Styled Tooltip
const TooltipContainer = styled.div`
  background: white;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  text-align: center;
`;
