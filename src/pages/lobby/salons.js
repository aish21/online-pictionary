import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import roomsList from "./rooms-list";
import Grid from "@material-ui/core/Grid";

function Form(props) {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: props.width,
    },
  }));
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
  });

  const handleChange = (event) => {
    setValues({ name: event.target.value });
  };
  const handleSubmit = (e) => {
    axios
      .post("/rooms/add", { username: props.username, name: values.name })
      .catch(function (error) {
        console.log(error);
      });
    setValues({ name: "" });
    e.preventDefault(); //prevents reloading...
  };
  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-name"
        label="Create A New Game Room (PRESS ENTER) 😍"
        className={classes.textField}
        value={values.name}
        onChange={handleChange}
        margin="normal"
        variant={"outlined"}
      />
    </form>
  );
}

//TODO Number of connected users

export default class rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ marginTop: "30px" }}
      >
        <Form
          width={700}
          socket={this.props.socket}
          username={this.props.username}
          rooms={this.props.rooms}
        />
        <roomsList
          width={700}
          history={this.props.history}
          rooms={this.props.rooms}
          isAdmin={this.props.isAdmin}
          username={this.props.username}
        />
      </Grid>
    );
  }
}
