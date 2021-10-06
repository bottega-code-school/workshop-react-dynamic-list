import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Playlist from "./Playlist";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:viewParam?" exact component={Playlist} />
      </Switch>
    </Router>
  );
};

export default App;
