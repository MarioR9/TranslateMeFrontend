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
       
           <Card style={{height:"200px"}} id={this.props.img.id} onClick={this.props.handleCardState} raised className="card" color='red' >
                <Card.Content>
                    <Card.Header>{this.props.img.input}</Card.Header>
                    <Card.Description>
                        {this.props.img.tarlanguage}
                    </Card.Description>
                </Card.Content>
              
                </Card>
           </Card.Group>
           
          </div>
        )
    }
}


