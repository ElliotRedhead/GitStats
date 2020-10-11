import React, {useState} from "react";

const Test = () => {

  const [fetchData, setFetchData] = useState();
  let reposAvailable = false;

  if (fetchData){
    // var commitsDisplay = fetchData.forEach((data, index) => <li key={index}>{data}</li>);
    var commitsDisplay = <p>{JSON.stringify(fetchData)}</p>;
  }
  const [externalInputText, setExternalInputText] = useState("https://api.github.com/users/ElliotRedhead/repos");
  const [internalInputText, setInternalInputText] = useState("http://localhost:8080/commitdetail");
  const [githubUserInputText, setGithubUserInputText] = useState("ElliotRedhead");
  // const [inputText, setInputText] = useState("http://localhost:8080/commits");

  const externalFetch = () => {
  
    fetch(externalInputText)
      .then(response => response.json())
      .then(
        (results) => {
          console.log(results[0]);
          setFetchData(results[0]);
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

  const githubUserFetch = () => {
      
    fetch(`https://api.github.com/users/${githubUserInputText}/repos`)
      .then(response => response.json())
      .then(
        (results) => {
          console.log(results);
          results.map((data, index) => {
            console.log(data.name);
            console.log(index);
          });

          setFetchData(results);
          reposAvailable = true;
          console.log(reposAvailable);
        }
      );

  };
    
  const writeData = () => {
    fetch("http://localhost:8080/repos", {
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
      <div>
        <ul>
          <li>Get list of repos for a user: https://api.github.com/users/ElliotRedhead/repos?per_page=100</li>
          <li>Get list of branches for a repo: https://api.github.com/repos/ElliotRedhead/ReactPortfolio/commits?per_page=100</li>
        </ul>
      </div>
      <div>
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
      </div>
      <div>
        <input
          type="text"
          value={githubUserInputText}
          onChange={event => setGithubUserInputText(event.target.value)}
        />
        <button onClick={githubUserFetch}>
        Fetch Repos for User
        </button>
      </div>

      <div>
        {fetchData ?
          <select>
            {fetchData.map((data,index) => (
              <option key={index}>{data.name}</option>
            ))
            }
          </select>
          : null
        }

      </div>


      {/* <div>
        <ol>
          {commitsDisplay}
        </ol>
      </div> */}
    </>
  );

};

export default Test;