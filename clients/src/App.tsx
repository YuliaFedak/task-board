import React from 'react';

import {BrowserRouter} from "react-router-dom";
import HomePage from "./page/Home.page";

const App = () => {
  return (
      <BrowserRouter>
        <HomePage/>
      </BrowserRouter>
  );
};

export default App;
