import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './Pages/Home/home.page';

const App = () => {
    return <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/movie/:id">
            <About />
        </Route>
        <Route path="/dashboard">
            <Dashboard />
        </Route>
    </Switch>
}

export default App;
