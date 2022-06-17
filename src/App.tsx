/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 14:28
*/

import React from 'react';

import firebase from "./core/config/firebase";
import HomeView from "./modules/home/views/HomeView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewPollView from "./modules/poll/views/NewPollView";
import SinglePollView from "./modules/poll/views/SinglePollView";

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<HomeView />} />
                <Route path={'/new'} element={<NewPollView />} />
                <Route path={'/:id'} element={<SinglePollView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
