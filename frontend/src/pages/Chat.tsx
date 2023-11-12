import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
const chatMessages = [
  { role: "user", content: "Hello, how are you?" },
  {
    role: "assistant",
    content: "Hi there! I'm doing well, thank you for asking.",
  },
  {
    role: "user",
    content: "That's great! I have some questions about a project.",
  },
  {
    role: "assistant",
    content: "Of course! I'm here to help. What do you need assistance with?",
  },
  {
    role: "user",
    content:
      "I'm working on a website and having trouble with the responsive design.",
  },
  {
    role: "assistant",
    content:
      "Responsive design can be tricky. What specific issues are you facing?",
  },
  {
    role: "user",
    content:
      "The layout doesn't look right on smaller screens, and the navigation menu is not collapsing.",
  },
  {
    role: "assistant",
    content:
      "I see. Have you implemented media queries for different screen sizes? Also, are you using a responsive framework?",
  },
  {
    role: "user",
    content:
      "Yes, I've added media queries, but it still doesn't seem to work as expected. I'm not using any framework.",
  },
  {
    role: "assistant",
    content:
      "Let's take a closer look. Can you share a snippet of your code where you've implemented the media queries for the layout?",
  },
  { role: "user", content: "Certainly! Here is the relevant CSS code:" },
  {
    role: "assistant",
    content:
      "Thank you for providing the code. I'll review it and suggest some improvements. Give me a moment.",
  },
  { role: "user", content: "Take your time. I appreciate your help!" },
  // Add more messages as needed
];

const Chat = () => {
  const auth = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17, 29, 39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0].toUpperCase()}
            {auth?.user?.name.split(" ")[1][0].toUpperCase()}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a chatbot
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 4,
              p: 3,
            }}
          >
            You can ask me questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[400],
              "&:hover": {
                bgcolor: red[500],
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            boxSizing: "border-box",
            padding: "20px",
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17, 27,39)",
            display: "flex",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10x",
              border: "none",
              color: "white",
              outline: "none",
              fontSize: "20px",
            }}
          />
          <IconButton sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
