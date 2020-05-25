import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 500,
    minHeight: 200,
  },
}));

export default function AddDogfight() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [course, setCourse] = useState("The Oaks");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCourse = JSON.stringify({
      date: selectedDate.toISOString(),
      course: course,
    });

    fetch("http://localhost:8000/dogfights", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: newCourse,
    }).then((res) => {
      console.log(res);
    });

    console.log(newCourse);
  };

  return (
    <Grid container justify="space-around">
      <Paper className={classes.root}>
        <Grid container justify="space-around">
          <form onSubmit={handleSubmit}>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="datePicker"
                  label="Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <Select
                labelId="courseLabel"
                id="courseSelect"
                value={course}
                onChange={handleCourseChange}
              >
                <MenuItem value={"The Oaks"}>The Oaks</MenuItem>
                <MenuItem value={"Panther Trail"}>Panther Trail</MenuItem>
                <MenuItem value={"Lake Windcrest"}>Lake Windcrest</MenuItem>
              </Select>
            </div>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}
