import React from "react";
import DeleteAddress from "./DeleteAddress";

const SingleAddress = (props) => {
  //console.log(props);
  return (
    <div>
      <p>{props.address}</p>
      <p>{props.name}</p>
      <DeleteAddress address={props.address} />
    </div>
  );
};

export default SingleAddress;
