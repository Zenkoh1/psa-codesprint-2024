import { Box, IconButton, Paper, Typography } from "@mui/material";
import useAPI from "../../api/useAPI";
import { useEffect } from "react";
import QuestionType from "../../types/Question.type";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

const ForumCard = ({
  question,
  onClick,
}: {
  question: QuestionType;
  onClick: () => void;
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }} onClick={onClick}>
      <Typography variant="h6">{question.title}</Typography>
      <Typography variant="body2" color="textSecondary">
        {question.author.username}
      </Typography>
    </Paper>
  );
};

const ForumWidget = () => {
  const navigate = useNavigate();

  const {
    fetchAPI,
    loading: loadingQuestions,
    data: dataQuestions,
  } = useAPI<JSON>("/api/v1/questions");

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Forum
        </Typography>
        <IconButton onClick={() => navigate("/forum")} size="large">
          <ArrowForward />
        </IconButton>
      </Box>
      {loadingQuestions && <p>Loading questions</p>}
      {dataQuestions &&
        Object.values(dataQuestions)
          .sort(
            (a: QuestionType, b: QuestionType) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          )
          .slice(0, 2)
          .map((question: QuestionType) => (
            <ForumCard
              key={question.id}
              question={question}
              onClick={() => navigate(`question/${question.id}`)}
            />
          ))}
    </Paper>
  );
};

export default ForumWidget;
