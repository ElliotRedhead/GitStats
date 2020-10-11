import React, {useState} from "react";

const Test = () => {

  const [fetchData, setFetchData] = useState();

  if (fetchData){
    // var commitsDisplay = fetchData.forEach((data, index) => <li key={index}>{data}</li>);
    var commitsDisplay = <p>{JSON.stringify(fetchData)}</p>;
    console.log(commitsDisplay);
  }
  const [externalInputText, setExternalInputText] = useState("https://api.github.com/repos/ElliotRedhead/ReactPortfolio/commits?sha=master&per_page=100");
  const [internalInputText, setInternalInputText] = useState("http://localhost:8081/commitdetail");
  // const [inputText, setInputText] = useState("http://localhost:8080/commits");

  const externalFetch = () => {
  
    fetch(externalInputText)
      .then(response => response.json())
      .then(
        (results) => {
          console.log(results);
          let commitDetails = {};
          results.forEach((data, index) => {
            console.log(data.commit);
            // data.commit.message
            commitDetails[index]={[data.commit.message] : data.commit};
          });
          setFetchData(commitDetails);
        }
      );
  };

  const internalFetch = () => {
  
    fetch(internalInputText)
      .then(response => response.json())
      .then(
        (results) => {
          console.log(results);
        }
      );
  };
    
  const writeData = () => {
    fetch("http://localhost:8080/commitdetail", {
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
        value={externalInputText}
        onChange={event => setExternalInputText(event.target.value)}
      />
      <button onClick={externalFetch}>External Fetch</button>
      <input
        type="text"
        value={internalInputText}
        onChange={event => setInternalInputText(event.target.value)}
      />
      <button onClick={internalFetch}>Internal Fetch</button>
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