"use client";

import { type ComponentProps, useMemo, useState } from "react";
import { PieChart } from "sowoon-chart";
import ColorInput from "./ColorInput";

interface Props {
  data: ComponentProps<typeof PieChart>["data"];
}

const Chart2 = ({ data }: Props) => {
  const legendList = ["happy", "tired", "stressed"];
  const [colorList, setColorList] = useState<string[]>([
    "#ff0000",
    "#00ff00",
    "#0000ff",
  ]);
  const [show, setShow] = useState(() =>
    legendList.reduce((acc, legend) => ({ ...acc, [legend]: true }), {}),
  );

  const filtered = useMemo(() => {
    return legendList.reduce<{
      data: Props["data"];
      colors: string[];
    }>(
      (acc, legend, index) => {
        if (show[legend as keyof typeof show]) {
          acc.data.push(data[index]);
          acc.colors.push(colorList[index]);
        }
        return acc;
      },
      { data: [], colors: [] },
    );
  }, [data, colorList, show]);

  return (
    <div className="flex flex-col items-center">
      <PieChart
        data={filtered.data}
        height={300}
        colorList={filtered.colors}
      ></PieChart>
      <div className="flex items-center gap-4">
        {legendList.map((legend, index) => (
          <div key={legend} className="flex items-center gap-2">
            <ColorInput
              color={colorList[index]}
              onChange={(color) => {
                const newColorList = [...colorList];
                newColorList[index] = color;
                setColorList(newColorList);
              }}
            />
            <button
              type="button"
              onClick={() => {
                setShow((prevShow) => ({
                  ...prevShow,
                  [legend]: !prevShow[legend as keyof typeof prevShow],
                }));
              }}
              className={`${show[legend as keyof typeof show] ? "" : "line-through"}`}
            >
              {legend}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart2;
