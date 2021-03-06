import React, {useState} from "react";
import { TextField, Button, Select, MenuItem, Grid, Paper, Card } from "@material-ui/core";
import ScrollVh from "../utilities/ScrollVh";
import "../styles/main.scss";

const GitCommits = () => {

	const [githubUserInput, setGithubUserInput] = useState("ElliotRedhead");
  
	const [repoOptions, setRepoOptions] = useState();
	const [selectedRepo, setSelectedRepo] = useState();
  
	const [branchOptions, setBranchOptions] = useState();
	const [selectedBranch, setSelectedBranch] = useState();

	const [fetchErrorText, setFetchErrorText] = useState();
  
	const [repoCommits, setCommits] = useState();

	const resetStates = (userReset=false, repoOptionsReset=false, repoSelectedReset=false, branchOptionsReset=false, branchSelectedReset=false, fetchErrorReset=false, commitsReset=false ) => {
		if(userReset){setGithubUserInput("ElliotRedhead");}
		if(repoOptionsReset){setRepoOptions();}
		if(repoSelectedReset){setSelectedRepo();}
		if(branchOptionsReset){setBranchOptions();}
		if(branchSelectedReset){setSelectedBranch();}
		if(fetchErrorReset){setFetchErrorText();}
		if(commitsReset){setCommits();}
	};

	const handleFetchResponse = (response) => {
		if (response.status === 403){setFetchErrorText("Rate limit for GitHub API has been exceeded, please try again later.");
		} else if (response.status === 404){setFetchErrorText("Selected credentials did not match an entry on GitHub.");
		} else {setFetchErrorText("A connection error occurred, try again later.");}
	};

	const githubUserFetch = () => {
		fetch(`https://api.github.com/users/${githubUserInput}/repos`)
			.then(response => {
				if (!response.ok) {handleFetchResponse(response);
				} else {
					return response;
          
				}
			})
			.then(response =>{ if(response){return response.json();}})
			.then(
				(results) => {
					setRepoOptions(results);
				}
			);
	};

	const repoBranchFetch = () => {
		fetch(`https://api.github.com/repos/${githubUserInput}/${selectedRepo}/branches?per_page=100`)
			.then(response => response.json())
			.then(
				(results) => {
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
											} else {
												setCommits(commitsList);
												ScrollVh();
											}
										}
									);
							};
							nextPageCommitFetch();
						});
			}
		});
	};

	return (
		<>
			<Grid container
				direction="column"
				alignItems="center">
				<Grid item container
					xs={12} md={10} lg={8}
					direction="column"
					alignItems="center"
					justify="center"
					style={{minHeight:"100vh"}}>
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
						>
							<Grid item xs={12}>
								<h1 style={{textAlign:"center"}}>GitStats - Commit Messages</h1>
							</Grid>
							<Grid item xs={12} sm={10} lg={8} container
								alignItems="center"
								spacing={2}>
								<Grid item xs={12} md={8}>
									<TextField
										required
										error={githubUserInput === ""}
										type="text"
										label="GitHub Username"
										variant="filled"
										value={githubUserInput}
										onChange={(event) => {
											setGithubUserInput(event.target.value);
											resetStates(false,true,true,true,true,true,true);
										} }
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<Button
										disabled={!githubUserInput}
										variant="contained"
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
												onChange={(event) => {
													setSelectedRepo(event.target.value);
													resetStates(false,false,false,true,true,true,true);}}
												value={selectedRepo ? selectedRepo : "None"}>
												<MenuItem value="None" disabled>None</MenuItem>
												{repoOptions.map((data,index) => (
													<MenuItem key={index} value={data.name}>{data.name}</MenuItem>
												))}
                    
											</Select>
										</Grid>
										<Grid item xs={12} md={4}>
											<Button
												disabled={!selectedRepo}
												variant="contained"
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
												onChange={(event) => {
													setSelectedBranch(event.target.value);
													resetStates(false,false,false,false,false,true,true);}}
												value={selectedBranch ? selectedBranch : "None"}>
												<MenuItem value="None" disabled>None</MenuItem>
												{branchOptions.map((data,index) => (
													<MenuItem key={index} value={data.name}>{data.name}</MenuItem>
												))}
											</Select>
										</Grid>
										<Grid item xs={12} md={4}>
											<Button
												disabled={!selectedBranch}
												variant="contained"
												color="primary"
												onClick={branchCommitFetch}>
              Fetch Commits for Selected Branch
											</Button>
										</Grid>
									</Grid>
								</>
								: null
							}
							{fetchErrorText ?
								<Grid item xs={12}>
									<p style={{color:"red"}}>
										{fetchErrorText}
									</p>
								</Grid>
								: null
							}
						</Grid>
					</Paper>
				</Grid>
				{repoCommits ?
					<>
						<Grid item container
							xs={12} md={10} lg={8}
							direction="column"
							alignItems="center"
							justify="center"
							style={{minHeight:"100vh"}}>
							<Paper
								elevation={10}
								style={{minHeight:"50vh"}}>
								<Grid container
									direction="column"
									alignItems="center"
									justify="center">
									<Grid container item xs={10} md={8}>
										<h2>Total number of commits: {repoCommits.length}</h2>
										{repoCommits.map((data,index) => (
											<Card
												raised
												key={index}
												style={{
													marginTop:"1rem",
													marginBottom:"1rem",
													padding:"2rem 2rem", 
													width:"100%"}}>
												{data.commit.message}
											</Card>
										))
										}
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</>
					: null }
			</Grid>

		</>
	);

};

export default GitCommits;