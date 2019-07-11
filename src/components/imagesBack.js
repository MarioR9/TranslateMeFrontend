import React from '../../node_modules/react'
import { Card } from '../../node_modules/semantic-ui-react'

export default class ImagesBack extends React.Component{
  constructor(){
    super()
    this.state={
      currentImages:[]
    
      }
  }

 
    render(){
        // let t = this 
        // debugger
        return(
      
            <div> 
         
         
         <Card.Group>
           <Card className="ui each imageCard" id={this.props.img.id} onClick={this.props.handleCardState} raised color='red' >
                <Card.Content meta textAlign="center" >
                    <br></br>
                    <br></br>
                    <Card.Header meta textAlign="center"><h1>{this.props.img.input}</h1></Card.Header>
                    <Card.Description  meta textAlign="center">
                      <h2>{this.props.img.tarlanguage}</h2>

                    </Card.Description>
                    
                    <br></br>
                    <Card.Header meta textAlign="center"><h1>{this.props.img.original}</h1></Card.Header>
                    <Card.Description  meta textAlign="center">
                      <h2>{this.props.img.orglanguage}</h2>

                    </Card.Description>
                </Card.Content>
               
                </Card>
                </Card.Group>
           
          </div>
        )
    }
}


