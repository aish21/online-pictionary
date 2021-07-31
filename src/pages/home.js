import React from "react";
import NavBar from "./navbar";
import rooms from "./lobby/rooms";
import io from "socket.io-client";
import room from "./room/room";
import { Route, Switch } from "react-router-dom";
import words from "./words";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default class MemberHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: {},
      words: [],
    };
  }

  componentDidMount() {
    this.props.history.listen((location, action) => {
      if (location.pathname)
        console.log(action, location.pathname, location.state);
      if (
        location.state &&
        location.state.prev_location &&
        location.state.prev_location.pathname.slice(0, 6) === "/room"
      ) {
        //got out of room
        const room_id = location.state.prev_location.pathname.slice(7);
        socket.emit("leaveRoom", room_id, this.props.user.username);
      }
    });
    // this.props.history.push('/home/oops', { some: 'state' });
    // unlisten();

    const socket = io();
    socket.on("connect", () => {
      console.log("Connected");
      socket.emit("activeUserConnected", this.props.user);
    });
    socket.on("updaterooms", (rooms) => {
      this.setState({ rooms: rooms });
    });
    socket.on("updatewords", (words) => {
      this.setState({ words: words });
    });

    this.setState({ socket });
  }

  render() {
    return (
      <>
        <NavBar user={this.props.user} history={this.props.history} />
        <Switch>
          <Route
            path="/room/:id"
            render={(props) => {
              const rooms = Object.keys(this.state.rooms);
              if (rooms.includes(props.match.params.id))
                return (
                  <room
                    {...props}
                    words={this.state.words}
                    user={this.props.user}
                    socket={this.state.socket}
                    history={this.props.history}
                    room={this.state.rooms[props.match.params.id]}
                  />
                );
            }}
          />
          <Route
            path="/words"
            render={() => {
              if (this.props.user.isAdmin)
                return (
                  <words
                    username={this.props.user.username}
                    socket={this.state.socket}
                    words={this.state.words}
                    history={this.props.history}
                  />
                );
            }}
          />

          <rooms
            username={this.props.user.username}
            isAdmin={this.props.user.isAdmin}
            socket={this.state.socket}
            rooms={this.state.rooms}
            history={this.props.history}
          />
        </Switch>
      </>
    );
  }
}
