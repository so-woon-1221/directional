"use client";

import { type ComponentProps, useMemo, useState } from "react";
import { GroupBarChart } from "sowoon-chart";
import ColorInput from "./ColorInput";

interface Props {
  data: ComponentProps<typeof GroupBarChart>["data"];
}

const Chart1 = ({ data }: Props) => {
  const legendList = Object.keys(data[0]).filter((key) => key !== "x");
  const [colorList, setColorList] = useState<string[]>([
    "#ff0000",
    "#00ff00",
    "#0000ff",
  ]);
  const [show, setShow] = useState(() =>
    legendList.reduce((acc, legend) => ({ ...acc, [legend]: true }), {}),
  );

  const filteredChartData = useMemo(() => {
    return data.map((item) => {
      // 1. "x"는 무조건 포함
      const newItem: any = {
        x: item.x,
      };

      // 2. 나머지 범례(legendList) 중 show가 true인 것만 복사
      legendList.forEach((legend) => {
        if (show[legend as keyof typeof show]) {
          newItem[legend as keyof typeof newItem] = item[legend];
        }
      });

      return newItem;
    });
  }, [data, show, legendList]);

  return (
    <div className="flex flex-col items-center">
      <GroupBarChart
        data={filteredChartData}
        height={300}
        colorList={colorList}
        tooltipOffset={{
          x: 10,
          y: 30,
        }}
      >
        {({ tooltipData }) => {
          return (
            <div className="bg-white rounded p-2 flex flex-col gap-2">
              <span>{tooltipData.x}</span>
              <span>{tooltipData.y}</span>
            </div>
          );
        }}
      </GroupBarChart>
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

export default Chart1;
