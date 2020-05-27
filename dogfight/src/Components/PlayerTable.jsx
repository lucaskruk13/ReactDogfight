import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import PlayerTableRow from "./PlayerTableRow";

const PlayerTable = (props) => {
  const [golfers, setGolfers] = useState(props.golfers.sort(compare));

  useEffect(() => {
    // When we add a new golfer in the dogfight class, we need to rerender the table from the props
    setGolfers(props.golfers.sort(compare));
  }, [props.golfers]);

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

export default PlayerTable;
