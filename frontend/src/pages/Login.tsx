import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import {IoIosLogIn} from "react-icons/io"
import CustomizedInput from '../components/shared/CustomizedInput'

const Login = () => {
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box 
        padding={8} 
        mt={8}
        display={{ md: "flex", sm:"none", xs: "none" }}
      >
         <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={'flex'}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
          <form
            style={{
              margin: "auto",
              padding: "30px",
              boxShadow: "10px 10px 20px #000",
              borderRadius: "10px",
              border: "none",
            }}
          >
            <Box
              sx={{
                display:"flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
               variant="h4"
               textAlign="center"
               padding={2}
               fontWeight={600}
              >
                Login
              </Typography>
              <CustomizedInput type="email" name="email" label="Email" />
              <CustomizedInput type="password" name="password" label="password" />
              <Button 
                type="submit"
                sx={{
                  px: 2,
                  py: 1,
                  mt: 2,
                  width: "400px",
                  borderRadius: 2,
                  bgcolor: "#00fffc",
                  ":hover": {
                    bgcolor: "white",
                    color: "black",
                  },
                }}

                endIcon={<IoIosLogIn />}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>

    </Box>
  )
}

export default Login
