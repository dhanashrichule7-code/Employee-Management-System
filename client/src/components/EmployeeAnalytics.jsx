import { useEffect, useState } from "react";
import { getEmployeeAnalytics } from "../services/analyticsService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

function EmployeeAnalytics({ refresh }) {
  const [departmentData, setDepartmentData] = useState([]);
  const [genderData, setGenderData] = useState([]);

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#9333ea",
  ];

  const PIE_COLORS = [
    "#3B82F6",
    "#EC4899",
  ];

  // Bar Chart Tooltip
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#1f2937",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "10px",
            boxShadow: "0 8px 20px rgba(0,0,0,.3)",
          }}
        >
          <p className="fw-bold mb-1">
            {payload[0].payload.department}
          </p>

          <p className="mb-0">
            Employees : {payload[0].value}
          </p>
        </div>
      );
    }

    return null;
  };

  // Pie Chart Tooltip
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#1f2937",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "10px",
            boxShadow: "0 8px 20px rgba(0,0,0,.3)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: "bold",
            }}
          >
            {payload[0].name}
          </p>

          <p style={{ margin: 0 }}>
            Employees : {payload[0].value}
          </p>
        </div>
      );
    }

    return null;
  };

  const fetchAnalytics = async () => {
    try {
      const data = await getEmployeeAnalytics();

      setDepartmentData(data.data.departmentData);
      setGenderData(data.data.genderData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [refresh]);

  return (
    <div className="card border-0 shadow-lg rounded-4 mt-4 p-4">

      <h3 className="fw-bold mb-4">
        📊 Employee Analytics
      </h3>

      <div className="row">

        {/* Department Chart */}

        <div className="col-lg-7">

          <div style={{ width: "100%", height: 420 }}>

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={departmentData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="department" />

                <YAxis allowDecimals={false} />

                <Tooltip content={<CustomBarTooltip />} />

                <Bar
                  dataKey="count"
                  radius={[8, 8, 0, 0]}
                  label={{
                    position: "top",
                    fill: "#ffffff",
                    fontWeight: "bold",
                  }}
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

        {/* Gender Pie Chart */}

        <div className="col-lg-5">

          <div style={{ width: "100%", height: 420 }}>

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ percent, x, y }) => (
                    <text
                      x={x}
                      y={y}
                      fill="#ffffff"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontWeight="bold"
                    >
                      {(percent * 100).toFixed(0)}%
                    </text>
                  )}
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip content={<CustomPieTooltip />} />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeAnalytics;