import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'


export default class CreateNewUser extends React.Component{
    constructor(){
        super()
        this.state ={
            username : ""
        }
    }

    handleNewUserFetch=()=>{
        
        fetch('http://localhost:3000/api/v1/users',{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                username: this.state.username
                })
            })
            .then(res=>res.json()).then(data => {
                // debugger
     
            console.log(data)})    
    }
    handleInput=(e)=>{
        // debugger
        this.setState({username : e.currentTarget.value})
    }


    render(){
        return(
            <div>
                 <Form>
                    
                    <label>First name</label>
                    <Input onChange={this.handleInput} placeholder='First name' />
                    <Button primary onClick={this.handleNewUserFetch}>Create</Button>
                    
                </Form>
            </div>
        )
    }
}