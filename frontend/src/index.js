import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Families from './components/Families';
import Students from './components/Students';
import Schools from './components/Schools';
import Professionals from './components/Professionals';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="/families" element={<Families/>}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/schools" element={<Schools/>}/>
        <Route path="/professionals" element={<Professionals/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
   ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
