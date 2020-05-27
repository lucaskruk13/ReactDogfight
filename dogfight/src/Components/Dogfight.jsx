import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import PlayerTable from "./PlayerTable";
import AddGolferSelect from "./AddGolferSelect";

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
        subheader={props.dogfight.course}
        action={<AddGolferSelect golfers={golfers} update={addGolfer} />}
      />
      <CardMedia
        className={classes.media}
        image={require(`./images/${getCourseImage(dogfight.course)}`)}
        title={dogfight.course}
      />
      <CardContent>
        <PlayerTable golfers={activeGolfers} dogfightId={dogfight._id} />
      </CardContent>
    </Card>
  );
};

export default Dogfight;
