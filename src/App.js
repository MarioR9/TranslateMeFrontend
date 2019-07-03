import React from '../node_modules/react';
import './App.css';
import NavBar from './components/NavBar'
import Home from './components/Home'
import Profile from './components/Profile'
import AllCategories from './components/AllCategories';
import Categories from './components/Categories'
import CreateNewUser from './components/CreateNewUser';
import Login from './components/Login'
import Images from './components/Images';
import CategoryCreation from './components/CategoryCreation'


export default class App extends React.Component {
  constructor(){
      super()
        this.state={
        homePage: false,
        profilePage: false,
        categoriesPage: false,
        AllCategoriesPage: false,
        CreateNewUserPage: false,  
        loginPage: true,
        imagesPage: false,
        listOfCategories: [],
        token: '',
        currentUser: [],
        allUsers: [],
        currentCategories: []

        }
  }
  componentDidMount=()=>{
    fetch('http://localhost:3000/api/v1/categories')
        .then(res=>res.json()).then(data => {
        this.setState({listOfCategories: data})})
    fetch('http://localhost:3000/api/v1/users')
        .then(res=>res.json()).then(data => {
        this.setState({allUsers: data})})
  }

  handleNavLogout=()=>{
    localStorage.clear()
    this.setState({
      homePage: false,
      profilePage: false,
      categoriesPage: false,
      AllCategoriesPage: false,
      CreateNewUserPage: false,  
      loginPage: true,
      imagesPage: false,
    })

  }
  handleNavProfile=()=>{
    this.setState({
      homePage: false,
      profilePage: true,
      categoriesPage: false,
      AllCategoriesPage: false,
      CreateNewUserPage: false,  
      loginPage: false,
      imagesPage: false,
    })

  }
  handleNavHome=()=>{
    this.setState({
      homePage: true,
      profilePage: false,
      categoriesPage: false,
      AllCategoriesPage: false,
      CreateNewUserPage: false,  
      loginPage: false,
      imagesPage: false,
    })

  }
  handleCreateNewUser=()=>{
    this.setState({
      homePage: false,
      profilePage: false,
      categoriesPage: false,
      AllCategoriesPage: false,
      CreateNewUserPage: true,  
      loginPage: false,
      imagesPage: false,
    })
  }
  handleImagePage=()=>{
    this.setState({
      homePage: false,
      profilePage: false,
      categoriesPage: false,
      AllCategoriesPage: false,
      CreateNewUserPage: false,  
      loginPage: false,
      imagesPage: true,
    })
  }

  handleToken=(data)=>{
    if(!data.message){
      this.setState({
        loginPage: false,
        profilePage: true,
        token: data.token,
        currentUser: data.user
      })
    }else{
      alert(data.message)
    }
  }
  handleCategoryPage=()=>{
    this.setState({
       profilePage: false,
       imagesPage:true
    })
  }
  handleCurrentCategories=(data)=>{

    this.setState({
      currentCategories: data
    })
  }


  handleCurrentPage=()=>{
    if(this.state.loginPage === true){
      return <Login handleToken={this.handleToken} handleCreateNewUser={this.handleCreateNewUser}/>
    }else if (this.state.homePage === true){
      return <Home categories={this.state.listOfCategories}/>
    }else if (this.state.profilePage === true){
      return <Profile handleCurrentCategories={this.handleCurrentCategories} handleCategoryPage={this.handleCategoryPage} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
    }else if (this.state.CreateNewUserPage === true){
      return <CreateNewUser/>
    }else if (this.state.imagesPage === true){
      return <Images img={this.state.currentCategories}/>
    }else if (this.state.categoriesPage === true){
      return <Categories />
    }
  }




  render (){
    return (
      <div>   
        <NavBar handleNavLogout={this.handleNavLogout} handleNavProfile={this.handleNavProfile} handleNavHome={this.handleNavHome}/>

        <div>    
          <CategoryCreation/>
        </div>
      </div>

    )
  }
}

