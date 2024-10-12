import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import React, { useState } from "react";

const ChatbotMessage = () => {
  return <>hello</>;
};

const Chatbot = () => {
  const PROMPT_SUGGESTIONS = [
    {
      title: "Explain",
      body: "Quantim computing in simple terms",
    },
    {
      title: "How to",
      body: "Learn step by step guidese",
    },
    {
      title: "Workshops",
      body: "Upcoming workshops",
    },
    {
      title: "Contact",
      body: "Contact information",
    },
  ]; // aiya anything la

  type MessageType = {
    sender: string;
    text: string;
  };

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim()) {
      setMessages([...messages, { sender: "user", text: inputValue }]);
      setInputValue("");

      // Simulate a bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: `You said: ${inputValue}` }, // TODO: Replace with actual bot response logic
        ]);
      }, 1000);
    }
  };

  return (
    <Container
      sx={{
        marginTop: 5,
        padding: 2,
        height: "70vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", marginBottom: 2, padding: 2 }}>
        {messages.length == 0 && (
          <Box sx={{ marginTop: 5 }}>
            <Typography variant="h4" gutterBottom>
              Good day! <br />
              How can I assist you today?
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 5 }}>
              {PROMPT_SUGGESTIONS.map((suggestion, index) => (
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
                  >
                    <Typography variant="h6">{suggestion.title}</Typography>
                    <Typography variant="body1">{suggestion.body}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {messages.map((msg, index) => (
          <Typography
            key={index}
            align={msg.sender === "user" ? "right" : "left"}
          >
            <Box
              sx={{
                display: "inline-block",
                backgroundColor: msg.sender === "user" ? "#3f51b5" : "#f1f1f1",
                color: msg.sender === "user" ? "white" : "black",
                borderRadius: "8px",
                padding: "8px",
                margin: "4px 0",
              }}
            >
              {msg.text}
            </Box>
          </Typography>
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
            startIcon={<Send />}
            sx={{ marginLeft: 2 }}
          >
            Send
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Chatbot;
