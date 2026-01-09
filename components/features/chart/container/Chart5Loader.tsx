import Chart5 from "../components/Chart5";
import { fetchWeeklyMoodTrend } from "../fetcher/chart.fetch";

const Chart5Loader = async () => {
  try {
    const data = await fetchWeeklyMoodTrend();

    const chartData = data.map((item) => {
      return {
        happy: item.happy,
        tired: item.tired,
        stressed: item.stressed,
        x: item.week,
      };
    });

    return <Chart5 data={chartData} />;
  } catch {
    return <div>Error</div>;
  }
};

export default Chart5Loader;
