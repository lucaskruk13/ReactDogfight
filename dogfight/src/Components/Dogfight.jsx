import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import PlayerTable from "./PlayerTable";
import AddGolferSelect from "./AddGolferSelect";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";

const ordinal = (num) => {
  var ordinal = require("ordinal");
  return ordinal(num);
};

const prizeMoney = {
  6: [50, 30],
  7: [50, 30, 15],
  8: [55, 35, 20],
  9: [60, 40, 25],
  10: [60, 40, 25, 15],
  11: [60, 45, 30, 20],
  12: [65, 45, 35, 25],
  13: [65, 45, 35, 25, 15],
  14: [70, 50, 35, 25, 20],
  15: [70, 55, 40, 30, 20],
  16: [75, 55, 45, 35, 20],
  17: [80, 60, 50, 35, 20],
  18: [80, 60, 55, 40, 25],
  19: [80, 60, 55, 40, 25, 15],
  20: [85, 65, 55, 40, 25, 20],
  21: [90, 70, 55, 40, 30, 20],
  22: [90, 70, 55, 40, 30, 20, 15],
  23: [95, 75, 60, 40, 30, 20, 15],
  24: [95, 75, 60, 40, 30, 20, 20, 10],
};

const getPrizeMoney = (numOfPlayers) => {
  if (numOfPlayers < 6) return "Minimum of 6 Players Needed";
  if (numOfPlayers > 24) return prizeMoney[24];
  return prizeMoney[numOfPlayers];
};

function getCourseImage(course) {
  if (course === "Panther Trail") return "pantherTrails.jpg";
  if (course === "The Oaks") return "theOaks.jpg";
  return "lakeWindcrest.jpg";
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    marginBottom: "25px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  flexContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    paddingLeft: "0",
    paddingRight: "0",
    paddingBottom: "10px",
  },
}));

const Dogfight = (props) => {
  const classes = useStyles(); // Load CSS Classes
  const [dogfight] = useState(props.dogfight);
  const [activeGolfers, setActiveGolfers] = useState(dogfight.active_golfers);
  const [dogfightDate] = useState(new Date(dogfight.date));
  const [golfers] = useState(props.golfers);

  const addGolfer = (golfer) => {
    console.log(`Adding ${golfer.lastName} to Dogfight on ${dogfight.date}`);

    const body = { dogfightId: dogfight._id, golferId: golfer._id };

    fetch("http://localhost:8000/dogfights/addGolfer/", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify(body),
    }).then((res) => {
      const url = "http://localhost:8000/dogfights/" + dogfight._id;
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          const newDogfight = data.active_golfers;
          setActiveGolfers(newDogfight);
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <Card>
      <CardHeader
        title={dogfightDate.toLocaleDateString()}
        subheader={
          props.dogfight.course +
          " - (" +
          props.dogfight.active_golfers.length +
          " Golfers)"
        }
        action={<AddGolferSelect golfers={golfers} update={addGolfer} />}
      />
      <CardMedia
        className={classes.media}
        image={require(`./images/${getCourseImage(dogfight.course)}`)}
        title={dogfight.course}
      />
      <CardContent>
        <Grid container className={classes.flexContainer}>
          <Grid item xs={12}>
            <List className={classes.flexContainer}>
              {getPrizeMoney(dogfight.active_golfers.length).map(
                (money, index) => (
                  <ListItem
                    key={money}
                    style={{
                      padding: "0",
                      margin: "0",

                      justifyContent: "center",
                    }}
                  >
                    <Typography>
                      {ordinal(index + 1)} - ${money}
                    </Typography>
                  </ListItem>
                )
              )}
            </List>
          </Grid>
        </Grid>

        <PlayerTable golfers={activeGolfers} dogfightId={dogfight._id} />
      </CardContent>
    </Card>
  );
};

export default Dogfight;
