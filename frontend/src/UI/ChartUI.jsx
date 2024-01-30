import React from "react";
import { ResponsivePie } from "@nivo/pie";

const ChartUI = (props) => {
  const getLeaveData = (status) => {
    if (props.leaves) {
      switch (status) {
        case "pending":
          return props.leaves.filter(
            (leaves) => leaves.leave_status === "pending"
          ).length;
        case "rejected":
          return props.leaves.filter(
            (leaves) => leaves.leave_status === "rejected"
          ).length;
        case "approved":
          return props.leaves.filter(
            (leaves) => leaves.leave_status === "approved"
          ).length;
        default:
          break;
      }
    }
  };

  const data = [
    {
      id: "accepted",
      label: "Approved",
      value: getLeaveData("approved"),
      color: "#90fda4",
    },
    {
      id: "rejected",
      label: "Rejected",
      value: getLeaveData("rejected"),
      color: "rgb(250, 88, 88)",
    },
    {
      id: "pending",
      label: "Pending",
      value: getLeaveData("pending"),
      color: "#fbf991",
    },
  ];
  return (
    <div style={{ height: 225 }}>
      <ResponsivePie
        colors={{ datum: 'data.color' }}
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 5]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default ChartUI;
