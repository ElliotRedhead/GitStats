import React, {useState} from "react";

const Test = () => {

  const [fetchData, setFetchData] = useState();
  
  fetch("https://api.github.com/repos/ElliotRedhead/ReactPortfolio/git/commits")
    .then(res => res.json())
    .then(
      (results) => {
        setFetchData(results);
      }
    );
    
  // const writeData = () => {
  //   fetch("http://localhost:8080/commits", {
  //     "body": JSON.stringify(fetchData),
  //     "headers": {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     "method": "PUT"
  //   });
  // };



  


  return (
    <>
      <div>{JSON.stringify(fetchData)}</div>
      {/* <button onClick={writeData}>Push Me</button> */}
    </>
  );

};

export default Test;