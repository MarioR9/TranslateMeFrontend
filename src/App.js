import React , {Fragment} from '../node_modules/react';
import './App.css';
import NavBar from './components/NavBar'
import Home from './components/Home'
import Profile from './components/Profile'
import CreateNewUser from './components/CreateNewUser';
import Login from './components/Login'
import { Route, Switch } from "react-router-dom";
import {BrowserRouter} from 'react-router-dom'
import Images from './components/images'
import Chat from './components/Chat'


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
        imagesFrontPage: false,
        chatPage: false,
        listOfCategories: [],
        token: '',
        currentUser: [],
        allUsers: [],
        currentCategories: [],
        currentUserCategories: [],
        currentImages: [],
        currentCardImages:[],
        cateId: null,
        currentPage: [],
        cateTitle : ""
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
        this.handleToken(data)
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
   
  this.handleCardImage(e.currentTarget.id)
    this.setState({
      homePage: false,
      profilePage: false,
      categoriesPage: false,
      AllCategoriesPage: false,
      CreateNewUserPage: false,  
      loginPage: false,
      imagesPage: true,
      cateId: e.currentTarget.id,
      cateTitle: e.currentTarget.dataset.name
    })
  }
  handleCateTitle=(data)=>{
    this.setState({cateTitle: data})
  }
  handleImagePageNew=(cateId)=>{
   
  this.handleCardImage(cateId)
    this.setState({
      homePage: false,
      profilePage: false,
      categoriesPage: false,
      AllCategoriesPage: false,
      CreateNewUserPage: false,  
      loginPage: false,
      imagesPage: true,
      cateId: cateId
    })
  }
  handleImageRender=(data)=>{
    this.setState({
      currentImages: [...this.state.currentImages,data]
     })
  }

  handleToken=(data)=>{
  // debugger
    if(data.newDup){
      this.handleImagePageNew(data.newDup.id,)
      this.handleCateTitle(data.newDup.title)
      this.setState({
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
          this.setState({listOfCategories: [...this.state.listOfCategories,data]})})  
      })
    }else if(!data.message){
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

  handleCardImage=(id)=>{
    
    fetch('http://localhost:3000/api/v1/findCategory',{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            cateId: id
           })
        }).then(resp=>resp.json()).then(data => {
            this.setState({currentCardImages: data})}) 
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
        this.setState({listOfCategories: [...this.state.listOfCategories,data]})}) 
    this.setState({
        homePage: false,
       profilePage :true,
       currentUser: data.user,
       currentUserCategories: [...this.state.currentUserCategories,data.categories],
    })
  }
  }


  handleRenderNewCategories=(data)=>{
    this.setState({
       profilePage :true,
       currentUser: data.user,
       currentUserCategories: data.categories
    })
    fetch('http://localhost:3000/api/v1/categories')
        .then(res=>res.json()).then(data => {
        this.setState({listOfCategories: [...this.state.listOfCategories,data]})})
  
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
  handleChat=()=>{
    this.setState({chatPage: true, profilePage: false})
  }

  handleCurrentPage=()=>{
    
    if(this.state.loginPage === true){
      return <Login handleLoginPage={this.handleLoginPage} handleRenderNewCategories={this.handleRenderNewCategories} handleToken={this.handleToken} handleCreateNewUser={this.handleCreateNewUser}/>
    }else if (this.state.homePage === true){
      return <Home handleImagePage={this.handleImagePage} handleLoginPage={this.handleLoginPage} handleHomePageToProfile={this.handleHomePageToProfile} handleToken={this.handleToken} currentUser={this.state.currentUser} categories={this.state.listOfCategories}/>
    }else if (this.state.profilePage === true){
      return <Profile handleChat={this.handleChat} handleCardImage={this.handleCardImage}  handleCategoryPage={this.handleCategoryPage} handleLoginPage={this.handleLoginPage} handleRenderNewCategories={this.handleRenderNewCategories} listOfCategories={this.state.listOfCategories} handleImagePage={this.handleImagePage} handleCateImages={this.handleCateImages} currentUserCategories={this.state.currentUserCategories} handleToken={this.handleToken} handleCreateCategory={this.handleCreateCategory} handleCurrentCategories={this.handleCurrentCategories} currentCategories={this.state.currentCategories} allUsers={this.state.allUsers} currentUser={this.state.currentUser}/>
    }else if (this.state.CreateNewUserPage === true){
      return <CreateNewUser handleToken={this.handleToken}/>
    }else if (this.state.imagesPage === true){
      return <Images cateTitle={this.state.cateTitle} cateId={this.state.cateId} currentCardImages={this.state.currentCardImages} handleImageRender={this.handleImageRender} currentImages={this.state.currentImages} handleImageBackPage={this.handleImageBackPage} allUsers={this.state.allUsers} currentUser={this.state.currentUser} handleCardImage={this.handleCardImage}/>
    }else if (this.state.chatPage === true){
      return <Chat username={this.state.currentUser.username} />
    }
  }




  render (){
    return (
      <div>   
        <NavBar handleNavLogout={this.handleNavLogout} handleNavProfile={this.handleNavProfile} handleNavHome={this.handleNavHome}/>
        <Fragment>
        {/* <BrowserRouter>
        <Fragment>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/signup" component={CreateNewUser} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/cards" component={Images}/>
            <Route path="/" component={Home} />
          </Switch>
          </Fragment>
        </BrowserRouter> */}
       
       {/* <Chat/> */}
        {this.handleCurrentPage()}
        </Fragment>
      </div>

    )
  }
}

