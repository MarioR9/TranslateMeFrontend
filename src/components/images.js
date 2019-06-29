import React from 'react'
import { Card, Message} from 'semantic-ui-react'



export default class Images extends React.Component{
    render(){
        let t = this 
        debugger
        return(
                
                <Card raised  >
                    <Card image={`${this.props.pic.result.images[0].image}`}/>
                    <Message info>
                        <Message.Header>{this.props.image.class}</Message.Header>
                        <p>{this.props.image.score}</p>
                    </Message>
                </Card>
        )
    }
}