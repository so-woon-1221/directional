"use client";

import Plotly from "plotly.js-dist-min";
import { useEffect, useRef, useState } from "react";
import type { fetchSnackImpact } from "../fetcher/chart.fetch";
import ColorInput from "./ColorInput";

interface Props {
  data: Awaited<ReturnType<typeof fetchSnackImpact>>;
}

const Chart10 = ({ data }: Props) => {
  const chartRef = useRef(null);

  const [teams, setTeams] = useState([
    { key: "marketing", name: "Marketing", color: "#ff4d4f", show: true },
    { key: "sales", name: "Sales", color: "#52c41a", show: true },
    { key: "hr", name: "HR", color: "#1677ff", show: true },
  ]);

  useEffect(() => {
    if (!chartRef.current) return;

    const snacksValues = data.departments[0].metrics.map((m) => m.snacks);

    const traces = [] as Plotly.Data[];

    teams.forEach((team) => {
      if (!team.show) return;

      const dept = data.departments.find((d) => d.name === team.name);
      if (!dept) return;

      traces.push({
        x: snacksValues,
        y: dept.metrics.map((m) => m.meetingsMissed),
        name: `${team.name} - Meetings Missed`,
        type: "scatter",
        mode: "lines+markers",
        line: { color: team.color, width: 2 },
        marker: { size: 8 },
        yaxis: "y1",
        hovertemplate:
          `<b>${team.name}</b><br>` +
          "Snacks: %{x}<br>" +
          "Meetings Missed: %{y}<br>" +
          "<extra></extra>",
      });

      traces.push({
        x: snacksValues,
        y: dept.metrics.map((m) => m.morale),
        name: `${team.name} - Morale`,
        type: "scatter",
        mode: "lines+markers",
        line: { color: team.color, width: 2, dash: "dash" },
        marker: { size: 10, symbol: "square" },
        yaxis: "y2",
        hovertemplate:
          `<b>${team.name}</b><br>` +
          "Snacks: %{x}<br>" +
          "Morale: %{y}<br>" +
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
    <div className="flex flex-col p-4">
      <div ref={chartRef} style={{ width: "100%", height: "600px" }} />

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
              className={`capitalize ${team.show ? "" : "line-through opacity-50"}`}
            >
              {team.key}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart10;
