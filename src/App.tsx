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

const App: React.FC = () => {

    return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<HomeView/>}/>
          </Routes>
      </BrowserRouter>
    );
}

export default App;
