import { fetchSnackImpact } from "../fetcher/chart.fetch";
import Chart10Wrapper from "./Chart10Wrapper";

const Chart10Loader = async () => {
  try {
    const data = await fetchSnackImpact();

    return <Chart10Wrapper data={data} />;
  } catch {
    return <div>Error</div>;
  }
};

export default Chart10Loader;
