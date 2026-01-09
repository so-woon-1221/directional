import Chart2 from "../components/Chart2";
import { fetchWeeklyMoodTrend } from "../fetcher/chart.fetch";

const Chart2Loader = async () => {
  try {
    const data = await fetchWeeklyMoodTrend();

    const chartData = data.map((item) => {
      return {
        key: item.week,
        data: [
          {
            x: "happy",
            y: item.happy,
          },
          {
            x: "tired",
            y: item.tired,
          },
          {
            x: "stressed",
            y: item.stressed,
          },
        ],
      };
    });

    return (
      <div className="grid grid-cols-2 gap-4">
        {chartData.map((chart) => (
          <div key={chart.key} className="flex flex-col gap-2">
            <div className="text-lg font-bold">{chart.key}</div>
            <Chart2 data={chart.data} />
          </div>
        ))}
      </div>
    );
  } catch {
    return <div>Error</div>;
  }
};

export default Chart2Loader;
