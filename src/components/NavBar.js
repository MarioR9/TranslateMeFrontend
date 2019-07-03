import React from 'react'
import { Menu } from 'semantic-ui-react'


export default class NavBar extends React.Component{
  

    render(){
  
        return(
          
         <Menu stackable>
        <Menu.Item >
          <img src='https://react.semantic-ui.com/logo.png' />
        </Menu.Item>

        <Menu.Item
          name='Profile'
          onClick={()=>{console.log("Profile")}}
          position="right"
        >
          Profile
        </Menu.Item>


        <Menu.Item 
        name='Home'
        onClick={()=>{console.log("Home")}}
 >
          Logout
        </Menu.Item>
      </Menu>
          
        )
    }
}
