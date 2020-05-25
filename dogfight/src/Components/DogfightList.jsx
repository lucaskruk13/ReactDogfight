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
  const [isLoaded, setIsLoaded] = useState(false);

  // Get The Dogfight List
  useEffect(() => {
    fetch("http://localhost:8000/dogfights/")
      .then((data) => data.json())
      .then((data) => {
        setDogfights(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoaded) {
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
              <Dogfight dogfight={dogfight} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  return <div>loading....</div>;
};

export default DogfightList;
