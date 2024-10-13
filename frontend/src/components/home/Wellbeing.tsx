import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Slider,
  Grid,
  Button,
} from "@mui/material";
import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVerySatisfied,
} from "@mui/icons-material";

const Wellbeing = () => {
  const [emotionLevel, setEmotionLevel] = useState(3); // Default to neutral
  const [stressLevel, setStressLevel] = useState(3); // Default to neutral

  return (
    <Card elevation={2} sx={{ p: 4 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Left half: "Rate Your Current State" text */}
          <Grid item xs={10} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column", // Stack items vertically
                alignItems: "flex-start", // Align text and buttons to the left
                justifyContent: "center", // Vertically center content
                height: "100%",
                pr: 6,
              }}
            >
              {/* Wellbeing message */}
              <Typography variant="h5" sx={{ mb: 2 }}>
                Here at PSA, we care about your wellbeing. How do you feel right
                now? ☔
              </Typography>

              {/* Button container */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert("Thank you for your feedback!")}
                >
                  Rate
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => alert("No worries, take care!")}
                >
                  No thanks
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right half: Emotional State and Stress Level sliders stacked vertically */}
          <Grid item xs={14} md={7}>
            <Typography variant="subtitle1">Emotional State</Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Slider
                value={emotionLevel}
                onChange={(event: Event, value: number | number[]) =>
                  setEmotionLevel(Array.isArray(value) ? value[0] : value)
                }
                aria-labelledby="emotion-slider"
                step={1}
                min={1}
                max={5}
                sx={{ flex: 1, mx: 2 }}
                marks={[
                  {
                    value: 1,
                    label: <SentimentVeryDissatisfied fontSize="small" />,
                  },
                  {
                    value: 2,
                    label: <SentimentDissatisfied fontSize="small" />,
                  },
                  { value: 3, label: <SentimentNeutral fontSize="small" /> },
                  { value: 4, label: <SentimentSatisfied fontSize="small" /> },
                  {
                    value: 5,
                    label: <SentimentVerySatisfied fontSize="small" />,
                  },
                ]}
              />
            </Box>

            <Typography variant="subtitle1">Stress Level</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Slider
                value={stressLevel}
                onChange={(event: Event, value: number | number[]) =>
                  setStressLevel(Array.isArray(value) ? value[0] : value)
                }
                aria-labelledby="stress-slider"
                step={1}
                min={1}
                max={5}
                sx={{ flex: 1, mx: 2 }}
                marks={[
                  {
                    value: 1,
                    label: <SentimentVeryDissatisfied fontSize="small" />,
                  },
                  {
                    value: 2,
                    label: <SentimentDissatisfied fontSize="small" />,
                  },
                  { value: 3, label: <SentimentNeutral fontSize="small" /> },
                  { value: 4, label: <SentimentSatisfied fontSize="small" /> },
                  {
                    value: 5,
                    label: <SentimentVerySatisfied fontSize="small" />,
                  },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Wellbeing;
