import React from 'react';
import { Switch, Route } from "react-router-dom";

import Navbar from './Components/navbar.component';

import Home from './Pages/Home/home.page';
import Movie from './Pages/Movie/movie.page';
import ResultSearch from './Pages/ResultSearch/ResultSearch.page';

const App = () => {
    return <>
        <Navbar />
        <main>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/result">
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
