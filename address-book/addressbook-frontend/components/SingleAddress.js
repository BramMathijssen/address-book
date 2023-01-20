import React, { useRef, useEffect, useState } from "react";
import DeleteAddress from "./DeleteAddress";
import jazzicon from "@metamask/jazzicon";

import styles from "./SingleAddress.module.scss";

const SingleAddress = (props) => {
  const avatarRef = useRef();

  useEffect(() => {
    console.log(`in useffect`);
    if (props.address) {
      const element = avatarRef.current;
      const addr = props.address.slice(2, 10);
      const seed = parseInt(addr, 16);
      const icon = jazzicon(50, seed); //generates a size 20 icon

      element.appendChild(icon);
    }
  }, [props.address, avatarRef]);
  return (
    <div className={styles.container}>
      <div className={styles.avatar} ref={avatarRef} />
      <div className={styles.addressDetails}>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.address}>{props.address}</p>
      </div>
      <div className={styles.button}>
        <DeleteAddress address={props.address} />
      </div>
    </div>
  );
};

export default SingleAddress;
