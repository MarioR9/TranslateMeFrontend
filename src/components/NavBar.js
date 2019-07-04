import React from '../../node_modules/react'
import { Menu } from '../../node_modules/semantic-ui-react'
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router} from 'react-router-dom';
export default class NavBar extends React.Component{


    render(){
  
        return(
          <Router>
         <Menu stackable>
            <Menu.Item >
              <img onClick={this.props.handleNavHome} src='https://react.semantic-ui.com/logo.png' />
            </Menu.Item>

            <Menu.Item
              name='Profile'
              onClick={this.props.handleNavProfile}
              as={NavLink} to="/profile">
              Profile
            </Menu.Item>


            <Menu.Item 
              name='Home'
              onClick={this.props.handleNavLogout}
              as={NavLink} to="/login">
              Logout
            </Menu.Item>
          </Menu>
          </Router>
        )}
}
