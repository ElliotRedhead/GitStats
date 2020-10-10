import { render } from "@testing-library/react";
import React, {useState} from "react";

const Test = () => {

  const [fetchData, setFetchData] = useState();

  if (fetchData){
    var commitsDisplay = fetchData.map((data, index) => <li key={index}>{data}</li>);
    console.log(commitsDisplay);
  }
  // const [inputText, setInputText] = useState("https://api.github.com/repos/ElliotRedhead/ReactPortfolio/commits?sha=master");
  const [inputText, setInputText] = useState("http://localhost:8080/commits");

  const externalFetch = () => {
  
    fetch(inputText)
      .then(response => response.json())
      .then(
        (results) => {
          console.log(results);
          let commitMessage = [];
          results.map((data) => {
            // data.commit.message
            commitMessage.push(data.commit.message);
          });
          setFetchData(commitMessage);
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
      <input
        type="text"
        value={inputText}
        onChange={event => setInputText(event.target.value)}
      >
      </input>
      <button onClick={externalFetch}>Fetch</button>
      <button onClick={writeData}>Write Data</button>
      {/* <div>{JSON.stringify(fetchData)}</div> */}
      <div>
        <ol>
          {commitsDisplay}
        </ol>
      </div>
    </>
  );

};

export default Test;