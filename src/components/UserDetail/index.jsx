// import React from "react";
// // import {Typography} from "@mui/material";
// import {
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemButton,
//   Typography,
// } from "@mui/material";

// import { Link } from "react-router-dom";

// import "./styles.css";
// import {useParams} from "react-router-dom";

// /**
//  * Define UserDetail, a React component of Project 4.
//  */
// function UserDetail() {
//     const user = useParams();
//     return (
//         <>
//           <Typography variant="body1">
//             This should be the UserDetail view of the PhotoShare app. Since it is
//             invoked from React Router the params from the route will be in property match.
//             So this should show details of user: {user.userId}.
//             You can fetch the model for the user from models.userModel.
//           </Typography>
          
//           <ListItemButton component={Link} to={`/photos/${user.userId}`}>
//             <ListItem>
//                     <ListItemText primary={`Photos`}/>
//             </ListItem>
//           </ListItemButton>
              
//         </>
//     );
// }

// export default UserDetail;

import React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";

// import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
    
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const data = await fetchModel(`/user/${userId}`);
          setUser(data);
        } catch (err) {
          console.error("Error fetching user details:", err);
        }
      };

      fetchUserData();
    }, [userId]); 

    if (!user) {
        return (
          <Typography variant="h6" style={{ padding: '20px' }}>
            Loading user details...
          </Typography>
        );
    }

    return (
        <Paper style={{ padding: '24px', margin: '16px' }} elevation={0}>
          
          <Typography variant="h4" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          <Divider style={{ marginBottom: '16px' }} />
          
          <Typography variant="body1" gutterBottom>
            <strong>Location:</strong> {user.location}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Occupation:</strong> {user.occupation}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '24px' }}>
            <strong>Description:</strong> {user.description}
          </Typography>
          
          <Button 
            // variant="contained"
            component={Link} 
            to={`/photos/${user._id}`}
          >
            See this user's photos
          </Button>
              
        </Paper>
    );
}

export default UserDetail;