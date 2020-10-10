import React, {useState} from "react";

const Test = () => {

  const [fetchData, setFetchData] = useState();
  
  fetch("https://api.github.com/users/elliotredhead/repos")
    .then(res => res.json())
    .then(
      (results) => {
        setFetchData(results);
      }
    );

  return (
    <div>{JSON.stringify(fetchData)}</div>
  );

};

export default Test;