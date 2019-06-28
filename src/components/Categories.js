import React from 'react'
import { Button, Dimmer, Header, Image, Card } from 'semantic-ui-react'


export default class Category extends React.Component{
    constructor(){
        super()
        this.state={
            active: false
        }
    }
    handleDimmer=()=>{
        this.setState({
            active: !this.state.active
        })
    }
    render(){
        const { active } = this.state
        const content = (
          <div>
            <Header as='h2' inverted>
              Title
            </Header>
    
            <Button circular size='huge' primary icon='plus' />
            <Button circular size='huge' icon='heart outline' />
       
          </div>
        )
        return(
            
            <Card raised className="card" color='red' image={
            <Dimmer.Dimmable
                
                as={Image}
                dimmed={active}
                dimmer={{ active, content }}
                onMouseEnter={this.handleDimmer}
                onMouseLeave={this.handleDimmer}
                size='medium'
                src='apple.jpg'
            />
        } /> 
     
        )
    }
}