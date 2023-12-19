import React from 'react'
import { Avatar, Box, Typography, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { useAuth } from '../context/AuthContext'

const chatMessages = [
  { role: 'user', content: "Hello, AI! What's the weather like today?" },
  { role: 'assistant', content: 'Hello! I can help you with that. Please provide me with your location.' },
  { role: 'user', content: 'I am in New York City.' },
  { role: 'assistant', content: 'Great! Let me check the weather for you.' },
  { role: 'assistant', content: 'The current temperature in New York City is 72°F with a chance of rain later today.' },
  { role: 'user', content: 'Thanks for the update!' },
  // Add more chats as needed
];

function Chat() {
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
          bgcolor: "rgb(17,29,39)",
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
          >{ auth?.user?.name[0] }
          {auth?.user?.name.split(" ")[0][1]}
          </Avatar>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans" 
            }}
          >
            you are talking to NextGen Chatbot

          </Typography>

          <Typography
            sx={{
               mx: "auto", 
               fontFamily: "work sans", 
               my: 4, 
               p: 3 
              }}
          >
           
           You can ask some questions related to Knowledge, Business, Advices Education, etc. But avoid sharing personal information Education, etc. But avoid sharing personal information
       
          </Typography>

          <Button
         
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
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
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>

        {/* render actual chats over here */}
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
          {chatMessages.map(( chat ) => <div>{ chat.content}</div>)}
        </Box>

      </Box>
    </Box>
  )
}

export default Chat

//this should contain all of the pages routes of our application