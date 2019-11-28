import React from 'react';
import { Switch, Route } from "react-router-dom";

import Navbar from './Components/navbar.component';

import Home from './Pages/Home/Home.page';
import Movie from './Pages/Movie/Movie.page';
import ResultSearch from './Pages/ResultSearch/ResultSearch.page';

const App = () => {
    return <>
        <Navbar />
        <main>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/resultado">
                    <ResultSearch />
                </Route>
                <Route path="/movie/:id">
                    <Movie />
                </Route>
            </Switch>
        </main>
    </>
}

export default App;
