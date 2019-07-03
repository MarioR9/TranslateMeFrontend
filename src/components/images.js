import React from 'react'
import { Card, Message, Header} from 'semantic-ui-react'



export default class Images extends React.Component{
    render(){
        let t = this 
        debugger
        return(
            <div>
                <Header as='h2' inverted>
                    {this.props.img.input}
                    </Header>
                    <Header as='h2' inverted>
                    {this.props.img.og_language}
                </Header>
                <Card raised image={this.props.img.url} >
                    
                    <Message info>
                        <Message.Header>{this.props.image.class}</Message.Header>
                        <p>{this.props.image.score}</p>
                    </Message>
                </Card>
            </div>
        )
    }
}


