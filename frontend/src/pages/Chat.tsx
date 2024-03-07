import  { useEffect, useLayoutEffect,  useRef, useState } from 'react'
import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteUserChats, sendChatRequest, getUserChats } from '../helpers/api-communicator';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

type Message = {
  role: "user" | "assistant";
  content: string;
};


const Chat = () => {
  
    const navigate = useNavigate();
    //ref will allow the dta to fetch the input that hav e typed by the user from the DOM
    const inputRef = useRef<HTMLInputElement | null>(null); 

    const auth = useAuth();

    //Once we recive input data from the user first we want store all of the chats 
    //first previous chats will be stored 
    //Then we want to insert latest chats to the array 

    const [chatMessages, setChatMessages] = useState<Message[]>([]);

     {/**once we click on the input button we need to send the data */}
     const handleSubmit = async () => {
      //get the latest input messages
      const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
      //store the input in the state as well
      {/**here we are getting type error so we can declare types as well at top */}
      setChatMessages((prev) => [...prev, newMessage]);


      //After creating new message inside the array now we want to send API request to Backend with new message 
      //with the help of that we will be reciving response as well and we can send new response inside the setChatMessages 
      //I will add in api communicator

      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);

     };

     const handleDeleteChats = async () => {
      try {
        toast.loading("Deleting Chats", { id: "deletechats" });
        await deleteUserChats();
        setChatMessages([]);
        toast.success("Deleted Chats Successfully", { id: "deletechats" });
      } catch (error) {
        console.log(error);
        toast.error("Deleting chats failed", { id: "deletechats" });
      }
    };


     useLayoutEffect(() => {
      if (auth?.isLoggedIn && auth.user) {
        toast.loading("Loading Chats", { id: "loadchats" });
        getUserChats()
          .then((data) => {
            setChatMessages([...data.chats]);
            toast.success("Successfully loaded chats", { id: "loadchats" });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Loading Failed", { id: "loadchats" });
          });
      }
    }, [auth]);
    

    //to check if user have logged in or not if not he will be redirected to signup page
    //using useEffect

    useEffect(() => {
      if (!auth?.user) {
        return navigate("/login");
      }
    }, [auth]);

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
          >
          { auth?.user?.name[0] }
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
            onClick={handleDeleteChats}
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
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div style={{ 
          width: "100%",
         borderRadius:20, 
         backgroundColor:"rgb(17,27,39)",
         boxSizing: 'border-box',
         display: "flex",
         margin: "auto",
         }}>
          {/** add Input tag to type  */}
        <input
          ref={inputRef} 
          type="text" 
          style={{ 
            width: "100%", 
            backgroundColor: "transparent",
            padding: "30px",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "20px",
            }}
        />
        {/**once we click on the input button we need to send the data */}
        <IconButton 
          onClick={handleSubmit}
          sx={{
            ml:"auto",
            color: "white",
            mx:1
          }}
        >
          <IoMdSend />
        </IconButton>

        </div>
        
      </Box>
    </Box>
  )
}

export default Chat

//this should contain all of the pages routes of our application