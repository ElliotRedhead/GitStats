import React from "react";

const Test = () => {
  
  fetch("https://api.github.com/users/elliotredhead/repos")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
      }
    );

  // return (
  //   <p>{info}</p>
  // );
};

export default Test;