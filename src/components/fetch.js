import React, {useState} from "react";

const Test = () => {

  const [fetchData, setFetchData] = useState();

  const externalFetch = () => {
  
    fetch("https://api.github.com/repos/ElliotRedhead/ReactPortfolio/commits?sha=master")
      .then(res => res.json())
      .then(
        (results) => {
          setFetchData(results);
        }
      );
  };
    
  const writeData = () => {
    fetch("http://localhost:8080/commits", {
      "body": JSON.stringify(fetchData),
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      "method": "PUT"
    });
  };



  


  return (
    <>
      <div>{JSON.stringify(fetchData)}</div>
      <button onClick={externalFetch}>External Fetch</button>
      <button onClick={writeData}>Write Data</button>
    </>
  );

};

export default Test;