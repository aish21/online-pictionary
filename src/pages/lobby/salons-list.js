import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import FilterVintage from "@material-ui/icons/FilterVintage";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios/index";

export default function roomsList(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: props.width,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();
  const handleClick = (room_id) => {
    axios.post("/rooms/delete", { room_id: room_id }).catch(function (error) {
      console.log(error);
    });
  };
  let activeuser_rooms = [],
    others_rooms = [];
  console.log("rooms", props.rooms);
  if (props.rooms) {
    Object.values(props.rooms).forEach((room) => {
      room.created_by === props.username
        ? activeuser_rooms.push(room)
        : others_rooms.push(room);
    });
  }

  const generate = (rooms, mine) => {
    return rooms.map((room) => (
      <List component="nav" aria-label="by you" key={room.name}>
        <ListItem
          button
          style={{ backgroundColor: "#C5FFBE", borderRadius: 10 }}
        >
          <ListItemIcon
            onClick={() =>
              props.history.push("/room/" + room._id, {
                prev_location: props.history.location,
              })
            }
          >
            <FilterVintage style={{ color: "green" }} />
          </ListItemIcon>
          <ListItemText
            onClick={() =>
              props.history.push("/room/" + room._id, {
                prev_location: props.history.location,
              })
            }
            primary={room.name}
            secondary={"by " + room.created_by}
          />
          <ListItemSecondaryAction>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textSecondary"
            >
              {" "}
              {room.users.length} players{" "}
            </Typography>
            {(props.isAdmin || mine) && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleClick(room._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    ));
  };

  return (
    <div className={classes.root}>
      <Divider />
      <Typography variant="h6">Created by You 🙋🏻‍♂️</Typography>
      <Divider />
      {generate(activeuser_rooms, true)}
      <Typography variant="h6">Created by Others 🙅🏻‍♂️</Typography>
      <Divider />
      {generate(others_rooms, false)}
    </div>
  );
}
