import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Dogfight from "./Dogfight";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const DogfightList = (props) => {
  const classes = useStyles();
  const [dogfights, setDogfights] = useState(null);
  const [golfers, setGolfers] = useState(null);
  const [isDogfightLoaded, setIsDogfightLoaded] = useState(false);
  const [isGolfersLoaded, setIsGolfersLoaded] = useState(false);

  // Get The Dogfight List
  useEffect(() => {
    fetch("http://localhost:8000/dogfights/")
      .then((data) => data.json())
      .then((data) => {
        setDogfights(data);
        setIsDogfightLoaded(true);
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:8000/golfers/")
      .then((data) => data.json())
      .then((data) => {
        setGolfers(data);
        setIsGolfersLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isDogfightLoaded && isGolfersLoaded) {
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          {dogfights.map((dogfight) => (
            <Grid
              item
              xs={8}
              style={{ marginBottom: "25px" }}
              key={dogfight._id}
            >
              <Dogfight dogfight={dogfight} golfers={golfers} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  return <div>loading....</div>;
};

export default DogfightList;
