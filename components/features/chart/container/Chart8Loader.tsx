import Chart8 from "../components/Chart8";
import { fetchWeeklyWorkoutTrend } from "../fetcher/chart.fetch";

const Chart8Loader = async () => {
  try {
    const data = await fetchWeeklyWorkoutTrend();

    const chartData = data.map((item) => {
      return {
        name: item.week,
        children: [
          { name: "Running", value: item.running },
          { name: "Cycling", value: item.cycling },
          { name: "Stretching", value: item.stretching },
        ],
      };
    });

    return <Chart8 data={chartData} />;
  } catch {
    return <div>Error</div>;
  }
};

export default Chart8Loader;
