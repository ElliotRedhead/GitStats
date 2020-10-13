import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import GitCommits from "./components/fetch";
import DeepPurpleTheme from "./utils/DeepPurpleTheme";


const App = () => {
  
  return (
    <>
      <ThemeProvider theme={DeepPurpleTheme}>
        <Switch>
          <Route path={"/"}>
            <GitCommits />
          </Route> 
        </Switch>
      </ThemeProvider>
    </>
  );
};

export default App;