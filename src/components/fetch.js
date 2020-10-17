import React, {useState} from "react";
import { FilledInput, Button, Select, MenuItem, Grid, Paper } from "@material-ui/core";
import "../styles/main.scss";

const GitCommits = () => {

  const [githubUserInput, setGithubUserInput] = useState("ElliotRedhead");

  const [repoOptions, setRepoOptions] = useState();
  const [selectedRepo, setSelectedRepo] = useState("");

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
                        commitObjects.shift();
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
      <Grid container
        justify="center"
        alignItems="center"
        style={{minHeight:"90vh",
          display:"flex"}}>
        <Grid item container
          xs={12} md={10} lg={8}
          direction="column"
          alignItems="center"
          justify="center"
          style={{minHeight:"90vh"}}>
          <Paper
            elevation={10}
            style={{
              paddingTop: "6rem",
              paddingBottom: "6rem",
              minWidth:"60vw"}}
          >
            <Grid container
              direction="column"
              spacing={8}
              alignItems="center"
              justify="center"

            >
              <Grid item xs={12} sm={10} lg={8} container
                alignItems="center"
                spacing={2}>
                <Grid item xs={12} md={8}>
                  <FilledInput
                    type="text"
                    label="Username"
                    variant="filled"
                    value={githubUserInput}
                    onChange={event => setGithubUserInput(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button variant="contained"
                    color="primary"
                    onClick={githubUserFetch}>
        Fetch Repos for User
                  </Button>
                </Grid>
              </Grid>

              {repoOptions ?
                <>
                  <Grid item xs={12} sm={10} lg={8} container
                    alignItems="center"
                    spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Select
                        onChange={event => setSelectedRepo(event.target.value)}
                        value={selectedRepo ? selectedRepo : "None"}>
                        <MenuItem value="None" disabled>None</MenuItem>
                        {repoOptions.map((data,index) => (
                          <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                        ))
                        }
                      </Select>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button variant="contained"
                        color="primary"
                        onClick={repoBranchFetch}>
              Fetch Branches for Selected Repo
                      </Button>
                    </Grid>
                  </Grid>
                </>
                : null
              }

              {branchOptions ?
                <>
                  <Grid item xs={12} sm={10} lg={8} container
                    alignItems="center"
                    spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Select
                        onChange={event => setSelectedBranch(event.target.value)}
                        value={selectedBranch ? selectedBranch : "None"}>
                        <MenuItem value="None" disabled>None</MenuItem>
                        {branchOptions.map((data,index) => (
                          <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button variant="contained"
                        color="primary"
                        onClick={branchCommitFetch}>
              Fetch Commits for Selected Branch
                      </Button>
                    </Grid>
                  </Grid>
                </>
                : null
              }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

};

export default GitCommits;