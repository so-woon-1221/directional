import Chart6 from "../components/Chart6";
import { fetchWeeklyMoodTrend } from "../fetcher/chart.fetch";

const Chart6Loader = async () => {
  try {
    const data = await fetchWeeklyMoodTrend();

    const chartData = data.map((item) => {
      return {
        name: item.week,
        children: [
          { name: "Happy", value: item.happy },
          { name: "Tired", value: item.tired },
          { name: "Stressed", value: item.stressed },
        ],
      };
    });

    return <Chart6 data={chartData} />;
  } catch {
    return <div>Error</div>;
  }
};

export default Chart6Loader;
