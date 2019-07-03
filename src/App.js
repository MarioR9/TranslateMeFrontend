import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Home from './components/Home'
import Profile from './components/Profile'
import Category from './components/AllCategories';
import CreateNewUser from './components/CreateNewUser';
import Login from './components/Login'

export default class App extends React.Component {
  constructor(){
      super()
        this.state={
        listOfCategories: []

        }
  }
  componentDidMount=()=>{
    fetch('http://localhost:3000/api/v1/categories')
        .then(res=>res.json()).then(data => {
 
        this.setState({listOfCategories: data})})

        
}





  render (){
    return (
      <div>   
        <NavBar/>

        <div>    
          {/* <Home categories={this.state.listOfCategories}/> */}
          {/* <Profile/> */}
          {/* <CreateNewUser/> */}
          <Login/>
        </div>
      </div>

    )
  }
}

