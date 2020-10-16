import React from "react";
import { Route, Switch } from "react-router-dom";
import GitCommits from "./components/fetch";


const App = () => {
  
  return (
    <>
      <Switch>
        <Route path={"/"}>
          <GitCommits />
        </Route> 
      </Switch>
    </>
  );
};

export default App;