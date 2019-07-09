import React from '../node_modules/react';
import './App.css';
import NavBar from './components/NavBar'
import Home from './components/Home'
import Profile from './components/Profile'
import CreateNewUser from './components/CreateNewUser';
import Login from './components/Login'
// import { Route, Switch } from "react-router-dom";
// import {BrowserRouter} from 'react-router-dom'
import Images from './components/images'
import ImagesBack from './components/imagesBack'

export default class App extends React.Component {
  constructor(){
      super()
        this.state={
        homePage: true,
        profilePage: false,
        categoriesPage: false,
        AllCategoriesPage: false,
        CreateNewUserPage: false, 
        createCategoryPage: false, 
        loginPage: false,
        imagesPage: false,
        imagesBackPage: false,
        listOfCategories: [],
        token: '',
        currentUser: [],
        allUsers: [],
        currentCategories: [],
        currentUserCategories: [],
        currentImages: [],
        cateId: 0,
        currentPage: []
        }
  }
  componentDidMount=()=>{
    fetch('http://localhost:3000/api/v1/categories')
    .then(res=>res.json()).then(data => {
    this.setState({listOfCategories: data})}) 
    let token = localStorage.getItem("token")
    if(token){
      fetch("http://localhost:3000/api/v1/authenticate", {
        headers: {
          "Authentication" : `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        this.props.handleToken(data)
      })
    }else{
      this.setState({
        profilePage: false
       })
    }
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
    if(localStorage.getItem('token')){
    this.setState({
      homePage: false,
      profilePage: true,
      categoriesPage: false,
      AllCategoriesPage: false,
      CreateNewUserPage: false,  
      loginPage: false,
      imagesPage: false,
    })
    }else{
      alert("Please Login")
      this.setState({
        loginPage: true})
    }
  }
  handleNavHome=()=>{
    fetch('http://localhost:3000/api/v1/categories')
    .then(res=>res.json()).then(data => {
    this.setState({listOfCategories: data})})

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
        homePage: false,
        token: data.token,
        currentUser: data.user,
        currentUserCategories: data.categories,
        })
        localStorage.setItem('token', data.token)
        fetch('http://localhost:3000/api/v1/findCategories',{
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({
              userId: data.user.id
              })
          })
          .then(res=>res.json()).then(data => {
          this.setState({currentImages: data})  
          fetch('http://localhost:3000/api/v1/categories')
          .then(res=>res.json()).then(data => {
          this.setState({listOfCategories: data})})  
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
  handleHomePageToProfile=(data)=>{
    if(data.message){
      alert(data.message)
    }else{
        fetch('http://localhost:3000/api/v1/categories')
        .then(res=>res.json()).then(data => {
        this.setState({listOfCategories: data})}) 
    this.setState({
        homePage: false,
       profilePage :true,
       currentUser: data.user,
       currentUserCategories: data.categories,
    })
  }
  }
  handleRenderNewCategories=(data)=>{
    this.setState({
       profilePage :true,
       currentUser: data.user,
       currentUserCategories: data.categories,
    })
    fetch('http://localhost:3000/api/v1/categories')
        .then(res=>res.json()).then(data => {
        this.setState({listOfCategories: data})})
  
  }

  handleImageBackPage=()=>{
    this.setState({
       imagesPage: !this.state.imagesPage,
       imagesBackPage:!this.state.imagesBackPage
    })
  }

  handleCreateCategory=()=>{
    this.setState({
      profilePage: false,
      createCategoryPage: true
    })
  }
  handleLoginPage=()=>{
    this.setState({loginPage: true})
  }
  // handleOff=()=>{
  //     if (this.state.homePage === true){
  //       return <Home currentUser={this.state.currentUser} categories={this.state.listOfCategories}/>
  //     }else if (this.state.profilePage === true){
  //       return <Profile listOfCategories={this.state.listOfCategories} handleImagePage={this.handleImagePage} handleCateImages={this.handleCateImages} currentUserCategories={this.state.currentUserCategories} handleToken={this.handleToken} handleCreateCategory={this.handleCreateCategory} handleCurrentCategories={this.handleCurrentCategories} currentCategories={this.state.currentCategories} handleCategoryPage={this.handleCategoryPage} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
  //     }else if (this.state.CreateNewUserPage === true){
  //       return <CreateNewUser/>
  //     }else if (this.state.imagesPage === true){
  //       return <Images cateId={this.state.cateId} currentImages={this.state.currentImages} handleImageRender={this.handleImageRender} cateId={this.state.cateId} handleImageBackPage={this.handleImageBackPage} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
  //     }else if (this.state.imagesBackPage === true){
  //       return <ImagesBack currentImages={this.state.currentImages} cateId={this.state.cateId} handleImageBackPage={this.handleImageBackPage} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
      
  //   }
  // }


  handleCurrentPage=()=>{
    
    if(this.state.loginPage === true){
      return <Login handleLoginPage={this.handleLoginPage} handleRenderNewCategories={this.handleRenderNewCategories} handleToken={this.handleToken} handleCreateNewUser={this.handleCreateNewUser}/>
    }else if (this.state.homePage === true){
      return <Home handleLoginPage={this.handleLoginPage} handleHomePageToProfile={this.handleHomePageToProfile} handleToken={this.handleToken} currentUser={this.state.currentUser} categories={this.state.listOfCategories}/>
    }else if (this.state.profilePage === true){
      return <Profile handleCategoryPage={this.handleCategoryPage} handleLoginPage={this.handleLoginPage} handleRenderNewCategories={this.handleRenderNewCategories} listOfCategories={this.state.listOfCategories} handleImagePage={this.handleImagePage} handleCateImages={this.handleCateImages} currentUserCategories={this.state.currentUserCategories} handleToken={this.handleToken} handleCreateCategory={this.handleCreateCategory} handleCurrentCategories={this.handleCurrentCategories} currentCategories={this.state.currentCategories} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
    }else if (this.state.CreateNewUserPage === true){
      return <CreateNewUser handleToken={this.handleToken}/>
    }else if (this.state.imagesPage === true){
      return <Images cateId={this.state.cateId} currentImages={this.state.currentImages} handleImageRender={this.handleImageRender} handleImageBackPage={this.handleImageBackPage} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
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

