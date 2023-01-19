import React, { useRef, useEffect, useState } from "react";
import DeleteAddress from "./DeleteAddress";
import jazzicon from "@metamask/jazzicon";

const SingleAddress = (props) => {
  const avatarRef = useRef();

  useEffect(() => {
    console.log(`in useffect`);
    if (props.address) {
      const element = avatarRef.current;
      const addr = props.address.slice(2, 10);
      const seed = parseInt(addr, 16);
      const icon = jazzicon(20, seed); //generates a size 20 icon

      element.appendChild(icon);
    }
  }, [props.address, avatarRef]);
  return (
    <div>
      <div ref={avatarRef} />
      <p>{props.address}</p>
      <p>{props.name}</p>
      <DeleteAddress address={props.address} />
    </div>
  );
};

export default SingleAddress;
