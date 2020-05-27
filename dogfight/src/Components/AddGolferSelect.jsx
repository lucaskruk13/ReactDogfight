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

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  addGolferRoot: {
    marginTop: "15px",
  },
}));

export default function AddGolferSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [golfers] = React.useState(props.golfers);
  const [golfer, setGolfer] = React.useState("");

  const handleChange = (event) => {
    const [gUnit] = golfers.filter((g) => event.target.value._id === g._id);
    setGolfer(gUnit || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e === "Close") {
      props.update(golfer);
    }
    setOpen(false);
  };

  return (
    <div className={classes.addGolferRoot}>
      <Button onClick={handleClickOpen}>Add Golfer</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="add-golfer-select-label">Golfer</InputLabel>
              <Select
                labelId="add-golfer-select-label"
                id="add-golfer-select"
                value={golfer}
                onChange={handleChange}
                input={<Input />}
              >
                {golfers.map((golfer) => (
                  <MenuItem value={golfer} key={golfer._id}>
                    {golfer.lastName}, {golfer.firstName}
                  </MenuItem>
                ))}
              </Select>
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
