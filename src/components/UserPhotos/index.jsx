import React from "react";
import { useEffect, useState } from "react";
import {
  ImageList,
  ImageListItem
} from "@mui/material";

import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import { Link } from "react-router-dom";

// import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData"

import "./styles.css";
import {useParams} from "react-router-dom";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    // const user = useParams();
    // const photos = models.photoOfUserModel(user.userId);

    const user = useParams();
    const [photos, setPhotos] = useState(null);

    useEffect(() => {
      const fetchPhotos = async () => {
        try {
          const data = await fetchModel(`/photosOfUser/${user.userId}`);
          setPhotos(data);
        } catch (err) {
          console.error("Error fetching user photos:", err);
        }
      };

      fetchPhotos();
    }, [user.userId]);

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    if (!photos) {
      return (
        <Typography variant="h6" style={{ padding: "20px" }}>
          Loading...
        </Typography>
      );
    }

    if (photos.length === 0) {
      return (
        <Typography variant="h6" style={{ padding: "20px" }}>
          This user doesn't have any pictures.
        </Typography>
      );
    }

    return (
    <>
      {/* <Typography variant="body1">
        This should be the UserPhotos view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user:
        {user.userId}. You can fetch the model for the user
        from models.photoOfUserModel(userId):
      </Typography> */}

      {/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {photos.map((item) => (
          <ImageListItem key={item._id}>
            <img
              src={require(`../../images/${item.file_name}`)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList> */}
      {photos.map((item) => (
        <Card key={item._id} style={{ marginBottom: "40px" }} elevation={3}>
          <CardMedia
            component="img"
            image={require(`../../images/${item.file_name}`)}
            alt={item.title || "User photo"}
            style={{ maxHeight: "600px", objectFit: "contain", backgroundColor: "#f5f5f5" }}
          />
          
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Posted on: {formatDate(item.date_time)}
            </Typography>

            <Typography variant="h6" style={{ marginTop: "16px", marginBottom: "8px" }}>
              Comments
            </Typography>
            <Divider />

            {/*List all comments from users*/}
            {item.comments && item.comments.length > 0 ? (
              <List>
                {item.comments.map((comment) => (
                  <ListItem key={comment._id} alignItems="flex-start" style={{ paddingLeft: 0 }}>
                    <ListItemText
                      primary={
                        <span>
                          {/*Link to user from comment*/}
                          <Link 
                            to={`/users/${comment.user._id}`} 
                            style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}
                          >
                            {comment.user.first_name} {comment.user.last_name}
                          </Link>
                          <Typography variant="caption" color="text.secondary" style={{ marginLeft: "8px" }}>
                            {formatDate(comment.date_time)}
                          </Typography>
                        </span>
                      }
                      secondary={
                        <Typography variant="body2" color="text.primary" style={{ marginTop: "4px" }}>
                          {comment.comment}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" style={{ marginTop: "8px" }}>
                There are no comments.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </>
    );
}

export default UserPhotos;
