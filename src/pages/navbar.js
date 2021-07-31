import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import auth from "../components/auth";
import Link from "@material-ui/core/Link";
import Switch from "@material-ui/core/Switch";
import ParticlesBg from "particles-bg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    flexGrow: 2,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const handleClick = () => {
    auth.logout(props.user.username, () => {
      window.location = "/";
    });
  };

  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.homeButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() =>
              props.history.push("/", { prev_location: props.history.location })
            }
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{ fontSize: 30 }}
            className={classes.toolbarTitle}
          >
            <span
              style={{ color: "#FF00EB", fontSize: 40, fontWeight: "bold" }}
            >
              පි
            </span>
            <span
              style={{ color: "#65D144", fontSize: 34, fontWeight: "bold" }}
            >
              ක්
            </span>
            <span
              style={{ color: "#151EFF", fontSize: 39, fontWeight: "bold" }}
            >
              ච
            </span>
            <span
              style={{ color: "#FFDD21", fontSize: 31, fontWeight: "bold" }}
            >
              න
            </span>
            <span
              style={{ color: "#28D6AE", fontSize: 40, fontWeight: "bold" }}
            >
              රි
            </span>
            <span
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: "-moz-initial",
              }}
            >
              {" "}
              Online
            </span>
            <span
              style={{
                height: 20,
                width: 20,
                borderRadius: 1000,
                backgroundColor: "red",
              }}
            ></span>
          </Typography>
          <Typography variant="h6" className={classes.toolbarTitle}>
            <span style={{ fontSize: 22, fontWeight: "bolder" }}>
              Welcome,{" "}
            </span>{" "}
            {props.user.username}. ❤️
          </Typography>
          {props.user.isAdmin && (
            <nav>
              <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Link
                variant="button"
                color="inherit"
                href="/words"
                className={classes.link}
              >
                Words
              </Link>
            </nav>
          )}

          <Button
            onClick={handleClick}
            color="inherit"
            variant="outlined"
            className={classes.link}
          >
            Logout
          </Button>
        </Toolbar>
        {state.checkedA ? (
          <ParticlesBg type="cobweb" bg={state.checkedA} />
        ) : null}
      </AppBar>
    </div>
  );
}
