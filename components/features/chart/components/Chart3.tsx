"use client";

import { type ComponentProps, useState } from "react";
import { BarChart } from "sowoon-chart";
import ColorInput from "./ColorInput";

interface Props {
  data: ComponentProps<typeof BarChart>["data"];
}

const Chart3 = ({ data }: Props) => {
  const [color, setColor] = useState("#ff0000");
  return (
    <div className="flex flex-col items-center">
      <BarChart data={data} height={300} color={color} />
      <div className="flex items-center gap-2">
        <ColorInput color={color} onChange={setColor} />
        <span>점유율</span>
      </div>
    </div>
  );
};

export default Chart3;
