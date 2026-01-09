import Chart2 from "../components/Chart2";
import Chart3 from "../components/Chart3";
import {
  fetchPopularSnackBrand,
  fetchWeeklyMoodTrend,
} from "../fetcher/chart.fetch";

const Chart3Loader = async () => {
  try {
    const data = await fetchPopularSnackBrand();

    const chartData = data.map((item) => {
      return {
        x: item.name,
        y: item.share,
      };
    });

    return <Chart3 data={chartData} />;
  } catch {
    return <div>Error</div>;
  }
};

export default Chart3Loader;
