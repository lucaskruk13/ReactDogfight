import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import PlayerTableRow from "./PlayerTableRow";

const PlayerTable = (props) => {
  const [isScored] = useState(props.golfers[0].score === 0 ? false : true);
  const [golfers, setGolfers] = useState(
    isScored ? props.golfers.sort(compare) : props.golfers.sort(nameCompare)
  );

  useEffect(() => {
    // When we add a new golfer in the dogfight class, we need to rerender the table from the props

    setGolfers(isScored ? golfers.sort(compare) : golfers.sort(nameCompare));
    console.log(golfers);
  }, [golfers, isScored]);

  const reorder = (new_golfer, new_score) => {
    // Staying functional

    const gfs = [...golfers];
    for (let i = 0; i < gfs.length; i++) {
      if (gfs[i].golferId === new_golfer.golferId) {
        new_golfer.score = new_score;
        gfs[i] = new_golfer;
      }
    }
    updateDb(new_golfer);
    setGolfers(gfs.sort(compare));
  };

  const updateDb = (new_golfer) => {
    const body = {
      dogfight: props.dogfightId,
      scoreObjectId: new_golfer._id,
      score: new_golfer.score,
    };

    fetch("http://localhost:8000/dogfights/postScoreForDogfight/", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify(body),
    }).then((res) => {
      console.log(res);
    });
  };

  if (golfers.length > 0) {
    return (
      <TableContainer>
        <Table aria-label="Golfer Table">
          <TableHead>
            <TableRow>
              <TableCell>Golfer</TableCell>
              <TableCell>Tee Time</TableCell>
              <TableCell>Quota</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {golfers.map((golfer) => (
              <PlayerTableRow
                key={golfer.golferId}
                golfer={golfer}
                update={reorder}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <div>There are no golfers</div>;
  }
};

const compare = (a, b) => {
  if (a.score - a.quota < b.score - b.quota) return 1;
  if (a.score - a.quota > b.score - b.quota) return -1;
  return 0;
};

const nameCompare = (a, b) => {
  const aName = `${a.lastName}, ${a.firstName}`;
  const bName = `${b.lastName}, ${b.firstName}`;

  if (aName < bName) {
    return -1;
  } else if (aName > bName) {
    return 1;
  }
  return 0;
};

export default PlayerTable;
