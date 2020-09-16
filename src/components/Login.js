import React from '../../node_modules/react'
import { Button,Form } from '../../node_modules/semantic-ui-react'


export default class Login extends React.Component{
    constructor(){
        super()
        this.state ={
            username: "",
            password: ""
        }
    }
  
    handleUsernameAndPassword=(e)=>{
        // debugger
        this.setState({
            username: e.currentTarget.children[0].children[1].children[0].value ,
            password: e.currentTarget.children[1].children[1].children[0].value  
        })
    }
    handleLoginFetch=()=>{
        fetch('http://localhost:3000/api/v1/login',{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
            })
        })
        .then(res=>res.json()).then(data => {
            // debugger
           this.props.handleToken(data)
        console.log(data)})
    }


    render(){
        return(
            <div className="ui login b" >
           
               
                    
                            <div className="form" >
                            <Form onChange={this.handleUsernameAndPassword}>
                            <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username' />
                            <Form.Input icon='lock' iconPosition='left' label='Password' type='password' />

                            <Button onClick={this.handleLoginFetch} content='Login' primary />
                            <Button onClick={this.props.handleCreateNewUser} content='Sign up' icon='signup' size='big' />
                            </Form>
                  
                            </div>

                
            </div>
        )
    }
}