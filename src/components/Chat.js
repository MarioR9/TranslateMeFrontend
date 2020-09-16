import React from 'react'
import ActionCable from 'actioncable'
let cable = ActionCable.createConsumer('ws://localhost:3000/cable')

export default class Chat extends React.Component{
        constructor(){
            super()
            this.state={
                messages: [],
                username:'',
                usernameData:"",
                ConversationsChannel: "",
                currentMessage: ""
            }
        }

componentDidMount=()=>{
   
  let conChan = cable.subscriptions.create({channel: 'ConversationsChannel', room: "Spanish"}, {
        // normal channel code goes here...
        connected: (data)=>{}, 
        disconnected:()=>{} , 
        received: (data)=>{
        this.setState({messages: [...this.state.messages,data.message], usernameData: data.username })}
    });
    this.setState({ConversationsChannel: conChan})
}
    handleMsg=(e)=>{ 
      
        this.setState({username: e.currentTarget.parentElement.children[0].value})
       this.state.ConversationsChannel.send({  message: this.state.currentMessage, username: this.state.username})
    } 
  
        render(){
            return(
                <div>
                    <input type="text"></input>
                    <input type="text" onChange={(e)=>{this.setState({currentMessage: e.currentTarget.value})}} ></input>
                    <button onClick={this.handleMsg}>Send Message</button>
                    <div>
                    {this.state.messages.map(msg => <p>{this.state.usernameData}: {msg}</p>)}
                    </div>
                </div>
            )
        }
}