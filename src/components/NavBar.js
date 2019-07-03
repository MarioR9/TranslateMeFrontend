import React from 'react'
import { Menu } from 'semantic-ui-react'


export default class NavBar extends React.Component{


    render(){
  
        return(
          
         <Menu stackable>
            <Menu.Item >
              <img onClick={this.props.handleNavHome} src='https://react.semantic-ui.com/logo.png' />
            </Menu.Item>

            <Menu.Item
              name='Profile'
              onClick={this.props.handleNavProfile}>
              Profile
            </Menu.Item>


            <Menu.Item 
            name='Home'
            onClick={this.props.handleNavLogout}>
              Logout
            </Menu.Item>
          </Menu>
          
        )}
}
