import React from '../../node_modules/react'
import { Menu } from '../../node_modules/semantic-ui-react'


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
