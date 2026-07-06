import { useEffect, useState } from "react";
import { getEmployeeAnalytics } from "../services/analyticsService";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

function EmployeeAnalytics() {

  const [departmentData, setDepartmentData] = useState([]);

  const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#9333ea",
];

  const fetchAnalytics = async () => {
    try {
      const data = await getEmployeeAnalytics();

      console.log("Department Data:", data.data.departmentData);

      setDepartmentData(data.data.departmentData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="card border-0 shadow-lg rounded-4 mt-4 p-4">

      <h3 className="fw-bold mb-4">
        📊 Employee Analytics
      </h3>

      <div style={{ width: "100%", height: 420 }}>
  <ResponsiveContainer>

    <BarChart
      data={departmentData}
      margin={{
        top: 20,
        right: 20,
        left: 0,
        bottom: 10,
      }}
    >

      <CartesianGrid
        strokeDasharray="3 3"
      />

      <XAxis dataKey="department" />

      <YAxis allowDecimals={false} />

      <Tooltip />

      <Bar
        dataKey="count"
        radius={[8, 8, 0, 0]}
      >

        {departmentData.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}

      </Bar>

    </BarChart>

  </ResponsiveContainer>
</div>
    </div>
  );
}

export default EmployeeAnalytics;