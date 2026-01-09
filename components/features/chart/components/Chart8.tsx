"use client";

import type { ComponentProps } from "react";
import { Treemap } from "recharts";

interface Props {
  data: ComponentProps<typeof Treemap>["data"];
}

const Chart8 = ({ data }: Props) => {
  return (
    <Treemap
      data={data}
      dataKey={"value"}
      aspectRatio={4 / 3}
      style={{
        width: "100%",
        aspectRatio: 4 / 3,
      }}
    />
  );
};

export default Chart8;
