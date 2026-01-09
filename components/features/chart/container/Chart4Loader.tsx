import Chart4 from "../components/Chart4";
import { fetchPopularSnackBrand } from "../fetcher/chart.fetch";

const Chart4Loader = async () => {
  try {
    const data = await fetchPopularSnackBrand();

    const chartData = data.map((item) => {
      return {
        x: item.name,
        y: item.share,
      };
    });

    return <Chart4 data={chartData} />;
  } catch {
    return <div>Error</div>;
  }
};

export default Chart4Loader;
