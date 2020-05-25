import React from "react";

export default function NewDogfight(props) {
  const dogfight = props.location.state;
  console.log(dogfight.active_golfers);

  return <div>Hello</div>;

  //   return (
  //     <React.Fragment>
  //       <List>
  //         {dogfight.active_golfers.map((golfer) => (
  //           <ListItem key={golfer}>{golfer}</ListItem>
  //         ))}
  //       </List>
  //     </React.Fragment>
  //   );
}
