"use client";

import type { ComponentProps } from "react";
import { StackBarChart } from "sowoon-chart";

interface Props {
  data: ComponentProps<typeof StackBarChart>["data"];
}

const Chart5 = ({ data }: Props) => {
  return (
    <StackBarChart
      data={data}
      height={300}
      colorList={["#FF5733", "#33FF57", "#5733FF"]}
    />
  );
};

export default Chart5;
