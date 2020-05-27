import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

const PlayerTableRow = (props) => {
  const [golfer] = useState(props.golfer);
  const [isEditing, setIsEditing] = useState(false);
  const [lastName] = useState(golfer.lastName);
  const [firstName] = useState(golfer.firstName);
  const [quota] = useState(golfer.quota);
  const [score, setScore] = useState(golfer.score);
  const [result, setResult] = useState(formatScore(score, quota));

  const toggle = (event) => {
    if (isEditing && score !== 0) {
      setResult(formatScore(score, quota));
      props.update(golfer, score);
    }

    setIsEditing(!isEditing);
  };

  const changeScore = (event) => {
    const target = event.target;

    setScore(parseInt(target.value, 10));
  };

  if (isEditing) {
    return (
      <TableRow>
        <TableCell>
          {lastName}, {firstName}
        </TableCell>
        <TableCell>{quota}</TableCell>
        <TableCell>
          <TextField
            defaultValue=""
            type="number"
            label="Edit Score"
            onChange={changeScore}
          />
        </TableCell>
        <TableCell>{result}</TableCell>
        <TableCell>
          <IconButton edge="end" aria-label="Edit" onClick={toggle}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>
        {lastName}, {firstName}
      </TableCell>
      <TableCell>{quota}</TableCell>
      <TableCell>{score === 0 ? "--" : score}</TableCell>
      <TableCell>{score === 0 ? "--" : result}</TableCell>
      <TableCell>
        <IconButton edge="end" aria-label="Edit" onClick={toggle}>
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const formatScore = (a, b) => {
  const score = a - b;

  if (score > 0) return `+${score}`;
  if (score === 0) return "E";
  return score;
};

export default PlayerTableRow;
