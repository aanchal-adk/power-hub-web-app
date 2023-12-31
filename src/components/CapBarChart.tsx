import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

interface CapBarChartProps {
    stats: {total: number; average: number};
}
 
const CapBarChart:React.FC<CapBarChartProps> = ({stats}) => {

    const data = [
        {
            name: "Total Watt Capacity",
            value: stats.total
        },
        {
            name: "Average Watt Capacity",
            value: stats.average
        }
    ]

 
    return (
        <BarChart width={200} height={200} data={data}>
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
            <XAxis dataKey="name" tick={false} />
            <YAxis />
        </BarChart>
    );
};
 
export default CapBarChart;