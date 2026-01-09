"use client";

import dynamic from "next/dynamic";
import type { fetchSnackImpact } from "../fetcher/chart.fetch";

const Chart10 = dynamic(() => import("../components/Chart10"), {
  ssr: false,
});

interface Props {
  data: Awaited<ReturnType<typeof fetchSnackImpact>>;
}

const Chart10Wrapper = ({ data }: Props) => {
  return <Chart10 data={data} />;
};

export default Chart10Wrapper;
