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
         
         
       
           <Card style={{height:"200px"}} id={this.props.img.id} onClick={this.props.handleCardState} raised className="card" color='red' >
                <Card.Content meta textAlign="center" >
                    <Card.Header meta textAlign="center">{this.props.img.input}</Card.Header>
                    <Card.Description  meta textAlign="center">
                        {this.props.img.tarlanguage}
                    </Card.Description>
                </Card.Content>
               
                </Card>
          
           
          </div>
        )
    }
}


