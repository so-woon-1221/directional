"use client";

import dynamic from "next/dynamic";
import type { fetchCoffeConsumption } from "../fetcher/chart.fetch";

const Chart9 = dynamic(() => import("../components/Chart9"), {
  ssr: false,
});

interface Props {
  data: Awaited<ReturnType<typeof fetchCoffeConsumption>>;
}

const Chart9Wrapper = ({ data }: Props) => {
  return <Chart9 data={data} />;
};

export default Chart9Wrapper;
