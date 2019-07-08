import React from '../node_modules/react';
import './App.css';
import NavBar from './components/NavBar'
import Home from './components/Home'
import Profile from './components/Profile'
import AllCategories from './components/AllCategories';
import Categories from './components/Categories'
import CreateNewUser from './components/CreateNewUser';
import Login from './components/Login'
// import { Route, Switch } from "react-router-dom";
// import {BrowserRouter} from 'react-router-dom'
import Images from './components/images'
import CategoryCreation from './components/CategoryCreation'
import ImagesBack from './components/imagesBack'

export default class App extends React.Component {
  constructor(){
      super()
        this.state={
        homePage: false,
        profilePage: false,
        categoriesPage: false,
        AllCategoriesPage: false,
        CreateNewUserPage: false, 
        createCategoryPage: false, 
        loginPage: true,
        imagesPage: false,
        imagesBackPage: false,
        listOfCategories: [],
        token: '',
        currentUser: [],
        allUsers: [],
        currentCategories: [],
        currentUserCategories: [],
        currentImages: [],
        cateId: 0
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
  handleCateImages=()=>{
   return this.state.allUsers.find(user => user.id === this.state.currentUser.id)
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
  handleImagePage=(e)=>{
   
    this.setState({
      homePage: false,
      profilePage: false,
      categoriesPage: false,
      AllCategoriesPage: false,
      CreateNewUserPage: false,  
      loginPage: false,
      imagesPage: true,
      cateId: e.currentTarget.id
    })
  }
  handleImageRender=(data)=>{
    this.setState({
      currentImages: data
     })
  }

  handleToken=(data)=>{
    if(!data.message){
      this.setState({
        loginPage: false,
        profilePage: true,
        token: data.token,
        currentUser: data.user,
        currentUserCategories: data.categories,
        })
        fetch('http://localhost:3000/api/v1/findCategories',{
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({
              userId: data.user.id
              })
          })
          .then(res=>res.json()).then(data => {
              // debugger
          console.log(data)
          this.setState({currentImages: data})    
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

  handleImageBackPage=()=>{
    this.setState({
       imagesPage: !this.state.imagesPage,
       imagesBackPage:!this.state.imagesBackPage
    })
  }




  // handleCurrentCategories=(data)=>{

  //   this.setState({
  //     currentCategories: data
  //   })
  // }
  handleCreateCategory=()=>{
    this.setState({
      profilePage: false,
      createCategoryPage: true
    })
  }


  handleCurrentPage=()=>{
    if(this.state.loginPage === true){
      return <Login handleToken={this.handleToken} handleCreateNewUser={this.handleCreateNewUser}/>
    }else if (this.state.homePage === true){
      return <Home currentUser={this.state.currentUser} categories={this.state.listOfCategories}/>
    }else if (this.state.profilePage === true){
      return <Profile listOfCategories={this.state.listOfCategories} handleImagePage={this.handleImagePage} handleCateImages={this.handleCateImages} currentUserCategories={this.state.currentUserCategories} handleToken={this.handleToken} handleCreateCategory={this.handleCreateCategory} handleCurrentCategories={this.handleCurrentCategories} currentCategories={this.state.currentCategories} handleCategoryPage={this.handleCategoryPage} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
    }else if (this.state.CreateNewUserPage === true){
      return <CreateNewUser/>
    }else if (this.state.imagesPage === true){
      return <Images cateId={this.state.cateId} currentImages={this.state.currentImages} handleImageRender={this.handleImageRender} cateId={this.state.cateId} handleImageBackPage={this.handleImageBackPage} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
    }else if (this.state.imagesBackPage === true){
      return <ImagesBack currentImages={this.state.currentImages} cateId={this.state.cateId} handleImageBackPage={this.handleImageBackPage} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
    }
  }




  render (){
    return (
      <div>   
        <NavBar handleNavLogout={this.handleNavLogout} handleNavProfile={this.handleNavProfile} handleNavHome={this.handleNavHome}/>
        <div>
        {/* <BrowserRouter>
        <div>
          <Switch>
            <Route path="/home" component={AllCategories} />
            <Route path="/signup" component={CreateNewUser} />
            <Route path="/login" component={Login} />
            <Route path="/category" component={CategoryCreation} />
            <Route path="/profile" component={Profile} />
            <Route path="/" component={Home} />
          </Switch>
          </div>
        </BrowserRouter> */}
       
        {this.handleCurrentPage()}
        </div>
      </div>

    )
  }
}

