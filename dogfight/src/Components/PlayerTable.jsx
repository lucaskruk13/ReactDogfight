import React, { useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import PlayerTableRow from "./PlayerTableRow";

const PlayerTable = (props) => {
  const [golfers, setGolfers] = useState(props.golfers.sort(compare));

  const reorder = (new_golfer, new_score) => {
    // Staying functional

    const gfs = [...golfers];
    console.log(gfs);
    for (let i = 0; i < gfs.length; i++) {
      if (gfs[i].golferId === new_golfer.golferId) {
        new_golfer.score = new_score;
        gfs[i] = new_golfer;
      }
    }

    setGolfers(gfs.sort(compare));
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
