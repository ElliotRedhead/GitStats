import React from "react";
import { Route, Switch } from "react-router-dom";
import Test from "./components/fetch";


const App = () => {
  
  return (
    <>
      <Switch>
        <Route path={"/"}>
          <Test />
        </Route> 
      </Switch>
    </>
  );
};

export default App;