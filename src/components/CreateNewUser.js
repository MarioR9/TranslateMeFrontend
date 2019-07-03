import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'


export default class CreateNewUser extends React.Component{
    constructor(){
        super()
        this.state ={
            username : "",
            password: ""
        }
    }

    handleNewUserFetch=()=>{
        
        fetch('http://localhost:3000/api/v1/users',{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
                })
            })
            .then(res=>res.json()).then(data => {
                // debugger
     
            console.log(data)})    
    }
    handleUsername=(e)=>{
   
        this.setState({
            username : e.currentTarget.value,
        })
    }
    handlePassword=(e)=>{
        this.setState({
          
            password: e.currentTarget.value
        })
    }


    render(){
        return(
            <div>
                 <Form>
                    
                    <label>Username</label>
                    <Input onChange={this.handleUsername} placeholder='Username' />
                    <label>Password</label>
                    <Input onChange={this.handlePassword} placeholder='Password' />
                    <Button primary onClick={this.handleNewUserFetch}>Create</Button>
                    
                </Form>
            </div>
        )
    }
}