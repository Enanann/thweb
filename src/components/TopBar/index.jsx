import React from "react";
import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom"; // Import hook để đọc URL
import models from "../../modelData/models"; // Import models để lấy tên user

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const location = useLocation();

    const [contextText, setContextText] = useState("");

    useEffect(() => {
        const path = location.pathname;
        
        const userMatch = path.match(/\/users\/(.+)/);
        const photoMatch = path.match(/\/photos\/(.+)/);

        if (userMatch) {
            const userId = userMatch[1];
            const user = models.userModel(userId);
            if (user) {
                setContextText(`${user.first_name} ${user.last_name}`);
            }
        } else if (photoMatch) {
            const userId = photoMatch[1];
            const user = models.userModel(userId);
            if (user) {
                setContextText(`${user.first_name} ${user.last_name}'s photos`);
            }
        } else {
            setContextText("MainPage");
        }
    }, [location]); // every time the url changes

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
          <Typography variant="h5" color="inherit">
            Trần Tiến Dũng 
          </Typography>

          <Typography variant="h5" color="inherit">
            {contextText} 
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
