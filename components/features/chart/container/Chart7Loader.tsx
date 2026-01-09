import Chart7 from "../components/Chart7";
import { fetchWeeklyWorkoutTrend } from "../fetcher/chart.fetch";

const Chart7Loader = async () => {
  try {
    const data = await fetchWeeklyWorkoutTrend();

    const chartData = data.map((item) => {
      return {
        running: item.running,
        cycling: item.cycling,
        stretching: item.stretching,
        x: item.week,
      };
    });

    return <Chart7 data={chartData} />;
  } catch {
    return <div>Error</div>;
  }
};

export default Chart7Loader;
