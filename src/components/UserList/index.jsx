import React from "react";
import { useEffect, useState } from "react";

import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    // const users = models.userListModel();
    const [users, setUsers] = useState(null);

    useEffect(() => {
      const fetchUserList = async () => {
        try {
          const data = await fetchModel(`/user/list`);
          setUsers(data);
        } catch (err) {
          console.error("Error fetching user list:", err);
        }
      };

      fetchUserList();
    }, []);

    if (!users) {
      return (
        <Typography variant="h6" style={{ padding: "20px" }}>
          Loading...
        </Typography>
      );
    }

    if (users.length === 0) {
      return (
        <Typography variant="h6" style={{ padding: "20px" }}>
          There are no users.
        </Typography>
      );
    }

    return (
      <div>
        <Typography variant="body1">
          User lists:
        </Typography>
        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItemButton component={Link} to={`/users/${item._id}`}>
                <ListItem>
                        <ListItemText primary={`${item.first_name} ${item.last_name}`}/>
                </ListItem>
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        {/* <Typography variant="body1">
          The model comes in from models.userListModel()
        </Typography> */}
      </div>
    );
}

export default UserList;
