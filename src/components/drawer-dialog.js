import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function DrawerDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    if (props.time_is_up) {
      setOpen(true);
    }
    return () => setOpen(false);
  }, [props.time_is_up]);

  const handleClose = (word) => {
    props.socket.emit("updateDrawnWord", props.room_id, word);
    setOpen(false);
  };
  const handleClick = (word) => {
    handleClose(word);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ paddingBottom: "0", alignSelf: "center" }}
        >
          {"Choose a word :"}
        </DialogTitle>
        <DialogActions>
          {props.trois_words.map((word) => (
            <Button
              key={word}
              onClick={() => handleClick(word)}
              color="primary"
              style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                fontFamily: "Roboto",
                fontSize: "20px",
              }}
            >
              {word}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </div>
  );
}
