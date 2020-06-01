import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  addDogfightRoot: {
    marginTop: "15px",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function AddGolferSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dogfight, setDogfight] = React.useState("");

  const handleChange = (event) => {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e === "Close") {
    }
    setOpen(false);
  };

  return (
    <div className={classes.addDogfightRoot}>
      <Fab
        aria-label="Add"
        className={classes.fab}
        color="primary"
        variant="extended"
        onClick={handleClickOpen}
      >
        <AddIcon />
        <Typography>Dogfight</Typography>
      </Fab>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add a Dogfight</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="add-dogfight-select-label">Dogfight</InputLabel>
              <Select
                labelId="add-dogfight-select-label"
                id="add-dogfight-select"
                value={dogfight}
                onChange={handleChange}
                input={<Input />}
              ></Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose("Cancel")}
            id="cancel"
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => handleClose("Close")} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
