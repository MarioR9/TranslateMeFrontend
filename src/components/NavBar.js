import React from '../../node_modules/react'
import { Menu } from '../../node_modules/semantic-ui-react'
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router} from 'react-router-dom';
import { Image} from '../../node_modules/semantic-ui-react'
export default class NavBar extends React.Component{


    render(){
  
        return(
          <Router>
         <Menu fluid inverted pointing stackable>
            <Menu.Item onClick={this.props.handleNavHome} as={NavLink} to="/home">
              <Image size="mini"  src='TestLogo.png' />
               Discover
           
            </Menu.Item>
           
            <Menu.Item
              name='Profile'
              onClick={this.props.handleNavProfile}
              as={NavLink} to="/profile">
              Profile
            </Menu.Item>
          {localStorage.getItem('token') ?
            <Menu.Item 
              name='logout'
              onClick={this.props.handleNavLogout}
              as={NavLink} to="/login">
              Logout
            </Menu.Item>
            :
            <Menu.Item 
              name='logout'
              onClick={this.props.handleNavLogout}
              as={NavLink} to="/login">
              Login
            </Menu.Item>}
            {/* <Menu.Item position='right'>
            <div id="google_translate_element"></div>
            </Menu.Item> */}
          </Menu>
          </Router>
        )}
}
