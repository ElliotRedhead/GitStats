import React, {useState} from "react";

// Get list of repos for a user: https://api.github.com/users/ElliotRedhead/repos?per_page=100
// Get list of branches for a repo: https://api.github.com/repos/ElliotRedhead/ReactPortfolio/commits?per_page=100

const GitCommits = () => {

  const [repoOptions, setRepoOptions] = useState();
  const [selectedRepo, setSelectedRepo] = useState();

  const [branchOptions, setBranchOptions] = useState();
  const [selectedBranch, setSelectedBranch] = useState();

  const [githubUserInput, setGithubUserInput] = useState("ElliotRedhead");
  // const [inputText, setInputText] = useState("http://localhost:8080/commits");


  const githubUserFetch = () => {
    fetch(`https://api.github.com/users/${githubUserInput}/repos`)
      .then(response => response.json())
      .then(
        (results) => {
          console.log(results);
          setRepoOptions(results);
        }
      );
  };

  const repoBranchFetch = () => {
    fetch(`https://api.github.com/repos/${githubUserInput}/${selectedRepo}/branches?per_page=100`)
      .then(response => response.json())
      .then(
        (results) => {
          console.log(results);
          setBranchOptions(results);
        }
      );
  };

  const branchCommitFetch = () => {
    branchOptions.map((data, index) => {
      if (data.name == selectedBranch){
        console.log(selectedBranch);
        console.log(data.commit.sha);
      }
    });
    // fetch(`https://api.github.com/repos/${githubUserInput}/${selectedRepo}/commits?per_page=100&sha=4763742bd53530916f92efe164909aafe50f6624`)
    //   .then(response => response.json())
    //   .then(
    //     (results) => {
    //       console.log(results);
    // setBranchOptions(results);
  };
  //     );
  // };

  return (
    <>
      <div>
        <input
          type="text"
          value={githubUserInput}
          onChange={event => setGithubUserInput(event.target.value)}
        />
        <button onClick={githubUserFetch}>
        Fetch Repos for User
        </button>
      </div>

      <div>
        {repoOptions ?
          <>
            <select
              onChange={event => setSelectedRepo(event.target.value)}>
              <option default disabled>None</option>
              {repoOptions.map((data,index) => (
                <option key={index}>{data.name}</option>
              ))
              }
            </select>
            <button onClick={repoBranchFetch}>
              Fetch Branches for Selected Repo
            </button>
          </>
          : null
        }
      </div>

      <div>
        {branchOptions ?
          <>
            <select
              onChange={event => setSelectedBranch(event.target.value)}>
              <option default disabled>None</option>
              {branchOptions.map((data,index) => (
                <option key={index}>{data.name}</option>
              ))}
            </select>
            <button onClick={branchCommitFetch}>
              Fetch Commits for Selected Branch
            </button>
          </>
          : null
        }
      </div>

    </>
  );

};

export default GitCommits;