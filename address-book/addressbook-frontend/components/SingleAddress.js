import React, { useRef, useEffect, useState } from "react";
import DeleteAddress from "./DeleteAddress";
import jazzicon from "@metamask/jazzicon";

import styles from "./SingleAddress.module.scss";
import EditModal from "./EditModal";

const SingleAddress = (props) => {
  const avatarRef = useRef();
  const [showModal, setshowModal] = useState(false);

  // https://stackoverflow.com/questions/71678374/get-metamask-profile-picture-and-name-use-web3
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

  const openModalHandler = () => {
    console.log(`test`);
    return <EditModal />;
  };

  return (
    <div className={styles.container}>
      {showModal && <EditModal />}
      <div className={styles.avatar} ref={avatarRef} />
      <div className={styles.addressDetails}>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.address}>{props.address}</p>
      </div>
      <div className={styles.button}>
        <DeleteAddress address={props.address} />
        <button onClick={() => setshowModal(true)}>Open Modal</button>
      </div>
    </div>
  );
};

export default SingleAddress;
