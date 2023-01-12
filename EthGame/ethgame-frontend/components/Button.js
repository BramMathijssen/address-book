import React from "react";

const Button = (props) => {
  return (
    <div>
      {console.log(`hey from button`)}
      {console.log(props)}
      <p>This is my state</p>
      <button className="button">{props.name}</button>
    </div>
  );
};

export default Button;
