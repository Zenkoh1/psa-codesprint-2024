import { Box, Grid, Typography } from "@mui/material";

import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import ChartGrid from "../components/ChartGrid";
import useAPI from "../api/useAPI";
import { useEffect } from "react";
import { WorkshopPerMonth } from "../types/charttypes/WorkshopPerMonth.type";
import { EmotionCount } from "../types/charttypes/EmotionCount.type";
import { StressCount } from "../types/charttypes/StressCount.type";
import { WorkshopRegistrationsPerMonth } from "../types/charttypes/WorkshopRegistrationsPerMonth.type";

const AdminDashboard = () => {
  const { fetchAPI: fetchWorkshopsAPI, data: dataWorkshops } =
    useAPI<WorkshopPerMonth>("/api/v1/dashboard/get_workshops_per_month");

  const { fetchAPI: fetchEmotionsCountAPI, data: dataEmotionsCount } =
    useAPI<EmotionCount>("/api/v1/dashboard/get_user_emotions_count");

  const { fetchAPI: fetchStressCountAPI, data: dataStressCount } =
    useAPI<StressCount>("/api/v1/dashboard/get_user_stress_count");
  const {
    fetchAPI: fetchWorkshopRegistrationsAPI,
    data: dataWorkshopRegistrations,
  } = useAPI<WorkshopRegistrationsPerMonth>(
    "/api/v1/dashboard/get_monthly_average_workshop_registrations",
  );

  useEffect(() => {
    fetchWorkshopsAPI();
    fetchEmotionsCountAPI();
    fetchStressCountAPI();
    fetchWorkshopRegistrationsAPI();
  }, []);

  const pieChartEmotion = [
    { colour: "red", label: "Very Sad" },
    { colour: "#f28e2c", label: "Slightly Sad" },
    { colour: "yellow", label: "Neutral" },
    { colour: "#90EE90", label: "Decently Happy" },
    { colour: "green", label: "Happy" },
  ];

  const pieChartStress = [
    { colour: "red", label: "Very Stressed" },
    { colour: "#f28e2c", label: "Slightly Stressed" },
    { colour: "yellow", label: "Neutral" },
    { colour: "#90EE90", label: "Decently Relaxed" },
    { colour: "green", label: "Relaxed" },
  ];

  return (
    <Box sx={{ p: 3, height: "100vh" }}>
      <Grid container spacing={3}>
        {dataWorkshops && (
          <ChartGrid title="Workshops per month">
            <BarChart
              dataset={dataWorkshops}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[{ dataKey: "count" }]}
              width={400}
              height={300}
            />
          </ChartGrid>
        )}
        {dataWorkshopRegistrations && (
          <ChartGrid title="Workshop registrations (avg)">
            <BarChart
              dataset={dataWorkshopRegistrations}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[{ dataKey: "average" }]}
              width={400}
              height={300}
            />
          </ChartGrid>
        )}
        {dataEmotionsCount && (
          <ChartGrid title="Total User Emotions Count">
            <PieChart
              series={[
                {
                  data: dataEmotionsCount.map((emotion) => ({
                    name: emotion.emotion,
                    value: emotion.count,
                    color: pieChartEmotion[emotion.emotion - 1].colour,
                    label: pieChartEmotion[emotion.emotion - 1].label,
                  })),
                  outerRadius: 100,
                },
              ]}
              width={400}
              height={300}
            />
          </ChartGrid>
        )}
        {dataStressCount && (
          <ChartGrid title="Total User Stress Count">
            <PieChart
              series={[
                {
                  data: dataStressCount.map((stress) => ({
                    name: stress.stress,
                    value: stress.count,
                    color: pieChartStress[stress.stress - 1].colour,
                    label: pieChartStress[stress.stress - 1].label,
                  })),
                  outerRadius: 100,
                },
              ]}
              width={400}
              height={300}
            />
          </ChartGrid>
        )}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
