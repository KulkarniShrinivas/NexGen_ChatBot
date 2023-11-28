import React from 'react'
import Logo from './shared/Logo';
//using the heder will be using component of MUI
import {  AppBar, Toolbar } from "@mui/material";

function Header() {
  return (
    <AppBar sx={{ bgcolor: "transparent", position:"static",boxShadow:"none"}}>
        <Toolbar sx={{ display: "flex"}}>
            <Logo />
        </Toolbar>
    </AppBar>
  )
}

export default Header
