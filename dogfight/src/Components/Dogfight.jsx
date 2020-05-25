import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import { red } from "@material-ui/core/colors";

import PlayerTable from "./PlayerTable";

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
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Dogfight = (props) => {
  const classes = useStyles(); // Load CSS Classes
  const [dogfight] = useState(props.dogfight);
  const [dogfightDate] = useState(new Date(dogfight.date));
  return (
    <Card>
      <CardHeader
        title={dogfightDate.toLocaleDateString()}
        subheader={props.dogfight.course}
      />
      <CardMedia
        className={classes.media}
        image={require(`./images/${getCourseImage(dogfight.course)}`)}
        title="Paella dish"
      />
      <CardContent>
        <PlayerTable golfers={dogfight.active_golfers} />
      </CardContent>
    </Card>
  );
};

export default Dogfight;
