"use client";

import Plotly from "plotly.js-dist-min";
import { useEffect, useRef, useState } from "react";
import type { fetchCoffeConsumption } from "../fetcher/chart.fetch";
import ColorInput from "./ColorInput";

interface Props {
  data: Awaited<ReturnType<typeof fetchCoffeConsumption>>;
}

const Chart9 = ({ data }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const [teams, setTeams] = useState([
    { key: "front", name: "Frontend", color: "#ff4d4f", show: true },
    { key: "back", name: "Backend", color: "#52c41a", show: true },
    { key: "AI", name: "AI", color: "#1677ff", show: true },
  ]);

  useEffect(() => {
    if (!Plotly || !chartRef.current) return;

    const cupsValues = data.teams[0].series.map((s) => s.cups);
    const traces: Plotly.Data[] = [];

    teams.forEach((team) => {
      if (!team.show) return;

      const teamData = data.teams.find((d) => d.team === team.name);
      if (!teamData) return;

      traces.push({
        x: cupsValues,
        y: teamData.series.map((s) => s.bugs),
        name: `${team.name} - Bugs`,
        type: "scatter",
        mode: "lines+markers",
        line: { color: team.color, width: 2 },
        marker: { size: 8 },
        yaxis: "y1",
        hovertemplate:
          `<b>${team.name}</b><br>` +
          "Cups: %{x}<br>" +
          "Bugs: %{y}<br>" +
          "<extra></extra>",
      });

      traces.push({
        x: cupsValues,
        y: teamData.series.map((s) => s.productivity),
        name: `${team.name} - Productivity`,
        type: "scatter",
        mode: "lines+markers",
        line: { color: team.color, width: 2, dash: "dash" },
        marker: { size: 10, symbol: "square" },
        yaxis: "y2",
        hovertemplate:
          `<b>${team.name}</b><br>` +
          "Cups: %{x}<br>" +
          "Productivity: %{y}<br>" +
          "<extra></extra>",
      });
    });

    const layout: Partial<Plotly.Layout> = {
      xaxis: {
        showgrid: true,
        gridcolor: "#e5e7eb",
      },
      yaxis: {
        showgrid: true,
        gridcolor: "#e5e7eb",
        side: "left",
      },
      yaxis2: {
        overlaying: "y",
        side: "right",
        showgrid: false,
      },
      hovermode: "closest",
      legend: {
        orientation: "h",
        y: -0.2,
      },
      plot_bgcolor: "#fafafa",
      paper_bgcolor: "white",
      showlegend: false,
    };

    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
    };

    Plotly.newPlot(chartRef.current, traces, layout, config);

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, [teams, data]);

  return (
    <div className="flex flex-col">
      <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
      <div className="flex gap-4 justify-center mt-4">
        {teams.map((team) => (
          <div key={team.key} className="flex gap-2 items-center">
            <ColorInput
              color={team.color}
              onChange={(color) => {
                setTeams((prevTeams) =>
                  prevTeams.map((t) =>
                    t.key === team.key ? { ...t, color } : t,
                  ),
                );
              }}
            />
            <button
              type="button"
              onClick={() => {
                setTeams((prevTeams) =>
                  prevTeams.map((t) =>
                    t.key === team.key ? { ...t, show: !t.show } : t,
                  ),
                );
              }}
              className={`${team.show ? "" : "line-through opacity-50"}`}
            >
              {team.key}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart9;
