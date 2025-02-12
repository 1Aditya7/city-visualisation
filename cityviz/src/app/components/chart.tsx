"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function Chart() {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const fetchNYCData = async () => {
      const response = await fetch(
        "https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=500"
      );
      const jsonData = await response.json();

      const grouped = d3.rollups(
        jsonData,
        (v) => v.length,
        (d) => d.created_date.split("T")[0]
      );

      setData(grouped.map(([date, count]) => ({ date, count })));
    };

    fetchNYCData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 0])
      .range([height, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.date) || 0)
      .attr("y", (d) => y(d.count))
      .attr("height", (d) => height - y(d.count))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue");

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat((d) => d.substring(5)));

    g.append("g").call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={chartRef} width="600" height="300"></svg>;
}
