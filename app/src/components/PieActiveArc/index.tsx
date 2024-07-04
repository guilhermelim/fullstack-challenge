import * as React from "react";
import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart } from "@mui/x-charts/PieChart";
import { DATA } from "./_mock";

interface DataChart {
  id: number;
  value: number;
  label: string;
}

const sizing = {
  margin: { right: 160 },
  width: 600,
  height: 300,
  // legend: { hidden: true },
};

export default function PieActiveArc({ data }: { data?: DataChart[] }) {
  const chartData = data ?? DATA; // Use data prop if provided, otherwise use mock data

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const TOTAL = data!.map((item) => item.value).reduce((a, b) => a + b, 0);
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <PieChart
      series={[
        {
          // arcLabel: (item) => `${item.value}%`,
          // @ts-ignore
          arcLabel: getArcLabel,
          arcLabelMinAngle: 45,
          data: chartData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      // height={200}
      {...sizing}
    />
  );
}
