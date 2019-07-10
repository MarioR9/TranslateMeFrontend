import React from 'react'
import ActionCable from 'actioncable'
let cable = ActionCable.createConsumer('ws://localhost:3000/cable')

export default class Chat extends React.Component{
        constructor(){
            super()
            this.state={
                messages: [],
                ConversationsChannel: ""
            }
        }

componentDidMount=()=>{

  let conChan = cable.subscriptions.create({channel: 'ConversationsChannel', room: "Spanish"}, {
        // normal channel code goes here...
        connected: (data)=>{}, 
        disconnected:()=>{} , 
        received: (data)=>{
        this.setState({messages: [...this.state.messages,data.message]})}
    });
    this.setState({ConversationsChannel: conChan})
}
    handleMsg=()=>{ 
       this.state.ConversationsChannel.send({  message: 'All the news that is fit to print' })
    }   
        render(){
            return(
                <div>
                    <button onClick={this.handleMsg}>Send</button>
                    <div>
                    {this.state.messages.map(msg => <p>{msg}</p>)}
                    </div>
                </div>
            )
        }
}