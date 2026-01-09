import Chart1 from "../components/Chart1";
import { fetchWeeklyMoodTrend } from "../fetcher/chart.fetch";

const Chart1Loader = async () => {
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

    return <Chart1 data={chartData} />;
  } catch {
    return <div>Error</div>;
  }
};

export default Chart1Loader;
