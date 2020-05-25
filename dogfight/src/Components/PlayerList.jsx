import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import PlayerListItem from "./PlayerListItem";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(10),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function PlayerList(props) {
  const classes = useStyles();
  const [dogfight, setDogfight] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setErrors] = useState();

  //   async function fetch() {
  //     const res = await fetch("http://localhost:8000/dogfights/upcoming");
  //     res
  //       .json()
  //       .then((res) => setDogfight(res[0]))
  //       .catch((errors) => setErrors(errors));
  //   }

  useEffect(() => {
    fetch("http://localhost:8000/dogfights/upcoming")
      .then((data) => data.json())
      .then((data) => {
        const [df] = data;
        setIsLoaded(true);
        setDogfight(df);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoaded && dogfight) {
    return (
      <div className={classes.root}>
        <Grid container style={{ border: "1px solid red" }} justify="center">
          <Grid item xs={8}>
            <Paper className={classes.paper} elevation={3}>
              <List>
                {dogfight.active_golfers.map((golfer) => (
                  <div key={golfer.golferId}>
                    <PlayerListItem golfer={golfer} key={golfer.golferId} />
                    <Divider />
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <div className={classes.root}>Loading....</div>;
  }
}
