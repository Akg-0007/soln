import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';
import Home from './Home';

function App() {

 
  return (
    <div className="App">


<Routes>
<Route path="/" element={ <Home/>} />


          <Route path="/update/:id" element={ <UpdateProduct/>} />
         
        </Routes>



        

    </div>
  );
}

export default App;
