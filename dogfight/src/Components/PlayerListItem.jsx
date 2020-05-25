import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const PlayerListItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(props.golfer.lastName);
  const [quota, setQuota] = useState(props.golfer.quota);

  const toggle = (event) => {
    if (isEditing) {
      const target = event.target;
      console.log(target.value);
    }

    setIsEditing(!isEditing);
  };

  const updateName = (event) => {
    const target = event.target;
    setName(target.value);
  };

  console.log(props.golfer);

  return <ListItem key={props.golfer.golferId}>{name}</ListItem>;
};

export default PlayerListItem;
