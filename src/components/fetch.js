import React, {useState} from "react";

const GitCommits = () => {

  const [githubUserInput, setGithubUserInput] = useState("ElliotRedhead");

  const [repoOptions, setRepoOptions] = useState();
  const [selectedRepo, setSelectedRepo] = useState();

  const [branchOptions, setBranchOptions] = useState();
  const [selectedBranch, setSelectedBranch] = useState();

  const githubUserFetch = () => {
    fetch(`https://api.github.com/users/${githubUserInput}/repos`)
      .then(response => response.json())
      .then(
        (results) => {
          // console.log(results);
          setRepoOptions(results);
        }
      );
  };

  const repoBranchFetch = () => {
    fetch(`https://api.github.com/repos/${githubUserInput}/${selectedRepo}/branches?per_page=100`)
      .then(response => response.json())
      .then(
        (results) => {
          // console.log(results);
          setBranchOptions(results);
        }
      );
  };

  const branchCommitFetch = () => {
    branchOptions.forEach((data) => {
      const latestCommitSha = data.name === selectedBranch && data.commit.sha;
      if (latestCommitSha) {
        fetch(`https://api.github.com/repos/${githubUserInput}/${selectedRepo}/commits?per_page=100&sha=${latestCommitSha}`)
          .then(response => response.json())
          .then(
            (results) => {
              // console.log(results);


              const commitsList = [];
              const oldestCommitShas = [];
              
              let commitObjects = results;
              commitsList.push(...commitObjects);
              let oldestCommitIndex = commitObjects.length - 1;
              let oldestCommitSha = (commitObjects[oldestCommitIndex]).sha;
              oldestCommitShas.push(oldestCommitSha);
              

              const nextPageCommitFetch = () => {
                oldestCommitSha = oldestCommitShas[oldestCommitShas.length-1];
                
                fetch(`https://api.github.com/repos/${githubUserInput}/${selectedRepo}/commits?per_page=100&sha=${oldestCommitSha}`)
                  .then(response => response.json())
                  .then(
                    (results) => {
                      commitObjects = results;
                      oldestCommitIndex = commitObjects.length - 1;
                      oldestCommitSha = (commitObjects[oldestCommitIndex]).sha;
                      oldestCommitShas.push(oldestCommitSha);
                      // console.log(results);
                      if (oldestCommitShas[oldestCommitShas.length-1] !== oldestCommitShas[oldestCommitShas.length-2] || oldestCommitShas.length < 2) {
                        // What would happen if repo has one page of commits equal to exactly 100?
                        // The first object of the appended objects list will equal that of the final object in the list at present.
                        commitsList.push(...commitObjects);
                        nextPageCommitFetch();
                      }
                    }
                  );
              };

              nextPageCommitFetch();
              console.log(commitsList);


            });
      }
    });};

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