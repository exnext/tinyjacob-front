import React from "react";
import { Routes, Route } from 'react-router-dom';
import Tiny from './components/Tiny'
import Messy from './components/Messy'
import Redirect from './components/Redirect'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Messy/>}/>
      <Route path='/:h' element={<Redirect/>}/>
      <Route path='/tiny/:h' element={<Tiny/>}/>
    </Routes>
    </>
  );
}

export default App;
