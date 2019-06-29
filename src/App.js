import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Home from './components/Home'
import Profile from './components/Profile'


function App() {
  return (
    <div>   
       <NavBar/>

      <div>    
        {/* <Home/> */}
        <Profile/>
      </div>
    </div>

  )
}

export default App;
