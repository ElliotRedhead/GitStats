import React from "react";
import { Route, Switch } from "react-router-dom";
import GitCommits from "./components/fetch";
import CommitCloud from "./components/wordcloud";


const App = () => {
  
	return (
		<>
			<Switch>
				<Route exact path={"/"}>
					<GitCommits />
				</Route>
				<Route exact path={"/commitcloud"}>
					<CommitCloud />
				</Route> 
			</Switch>
		</>
	);
};

export default App;