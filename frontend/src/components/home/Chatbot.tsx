import { Send, Delete } from "@mui/icons-material";
import MessageType from "../../types/Message.type";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { MuiMarkdown } from "mui-markdown";
import React, { useContext, useState } from "react";
import session from "../../api/sessions_manager";
import axios from "axios";
import { API_URL } from "../../api/useAPI";
import Wellbeing from "./Wellbeing";

const PROMPT_SUGGESTIONS = [
  {
    title: "Summarize",
    body: "Give me key points from my meeting notes",
  },
  {
    title: "Draft",
    body: "Write me an email to my boss",
  },
  {
    title: "Brainstorm",
    body: "Generate ideas for my teams upcoming project",
  },
  {
    title: "Learn",
    body: "Recommend me some workshops to attend",
  },
];

const ChatbotMessage = ({ message }: { message: MessageType }) => {
  return (
    <Box sx={{ textAlign: message.sender === "user" ? "right" : "left" }}>
      <Box
        sx={{
          display: "inline-block",
          backgroundColor: message.sender === "user" ? "#3f51b5" : "#f1f1f1",
          color: message.sender === "user" ? "white" : "black",
          borderRadius: "8px",
          padding: "8px",
          margin: "4px 0",
        }}
      >
        <MuiMarkdown>{message.text}</MuiMarkdown>
      </Box>
    </Box>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showRating, setShowRating] = useState(true);
  const { isAuth } = useContext(session.SessionContext);

  // Repeated code is bad code
  const handlePromptSuggestion = async (
    promptBody: string,
    saveMessage: boolean,
  ) => {
    if (saveMessage)
      setMessages([...messages, { sender: "user", text: promptBody }]);
    try {
      const user = session.getters.getUser();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "model", text: "..." },
      ]);
      const response = await axios.post(
        API_URL + "/api/v1/gemini/chatbot",
        {
          user_id: user.id,
          messages: [{ sender: "user", text: promptBody }],
        },
        { headers: { "content-type": "application/json" } },
      );

      // Append the chatbot's response to messages
      if (response.data?.response) {
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { sender: "model", text: response.data.response },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { sender: "model", text: "Sorry, I didn't get that" },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          sender: "model",
          text: "Sorry, I didn't get that, I might have ran out of tokens because I am free to use.",
        },
      ]);
    }
  };

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim()) {
      const newMessages = [...messages, { sender: "user", text: inputValue }];
      setMessages(newMessages);
      setInputValue("");

      try {
        const user = session.getters.getUser();
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "model", text: "..." },
        ]);
        const response = await axios.post(
          API_URL + "/api/v1/gemini/chatbot",
          {
            user_id: user.id,
            messages: newMessages,
          },
          { headers: { "content-type": "application/json" } },
        );

        // Append the chatbot's response to messages
        if (response.data?.response) {
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { sender: "model", text: response.data.response },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { sender: "model", text: "Sorry, I didn't get that" },
          ]);
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          {
            sender: "model",
            text: "Sorry, I didn't get that, I might have ran out of tokens because I am free to use.",
          },
        ]);
      }
    }
  };

  return (
    <Container
      sx={{
        padding: 2,
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        pointerEvents: isAuth ? "all" : "none",
        opacity: isAuth ? 1 : 0.5,
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
        {messages.length == 0 && (
          <Box>
            <Typography variant="h4" gutterBottom>
              Good day! <br />
              How can I assist you today?
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {showRating && (
                <Grid item xs={24} sm={12} sx={{ marginBottom: 2 }}>
                  <Wellbeing
                    onClose={({ emotion, stress }) => {
                      if (emotion !== -1 && stress !== -1) {
                        handlePromptSuggestion(
                          `The user is feeling emotion ${emotion} out of 5 (5 is happiest), and stress ${stress} out of 5 (1 is most stressed). Please assist.`,
                          false,
                        );
                      }
                      setShowRating(false);
                    }}
                  />
                </Grid>
              )}
              {!showRating &&
                PROMPT_SUGGESTIONS.map((suggestion, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      sx={{
                        padding: 2,
                        marginBottom: 2,
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f1f1f1",
                        },
                      }}
                      elevation={2}
                      onClick={() =>
                        handlePromptSuggestion(suggestion.body, true)
                      }
                    >
                      <Typography variant="h6">{suggestion.title}</Typography>
                      <Typography variant="body1">{suggestion.body}</Typography>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}

        {messages.length > 0 &&
          messages.map((msg, index) => (
            <ChatbotMessage key={index} message={msg} />
          ))}
      </Box>

      <form onSubmit={handleSendMessage}>
        <Box sx={{ display: "flex" }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoComplete="off"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginLeft: 1 }}
          >
            <Send />
          </Button>
          <Button
            onClick={() => setMessages([])}
            variant="contained"
            color="secondary"
            sx={{ marginLeft: 1 }}
          >
            <Delete />
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Chatbot;
