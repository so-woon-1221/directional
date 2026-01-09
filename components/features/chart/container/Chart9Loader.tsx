import { fetchCoffeConsumption } from "../fetcher/chart.fetch";
import Chart9Wrapper from "./Chart9Wrapper";

const Chart9Loader = async () => {
  try {
    const data = await fetchCoffeConsumption();

    return <Chart9Wrapper data={data} />;
  } catch {
    return <div>Error</div>;
  }
};

export default Chart9Loader;
