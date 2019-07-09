import React from '../../node_modules/react'
import { Card } from '../../node_modules/semantic-ui-react'

export default class ImagesBack extends React.Component{
  constructor(){
    super()
    this.state={
      currentImages:[]
    
      }
  }
componentDidMount=()=>{
  fetch('http://localhost:3000/api/v1/findCategory',{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
          cateId: this.props.cateId,
         })
      }).then(resp=>resp.json()).then(data => {
          this.setState({currentImages: data})})
 
}



 
    render(){
        // let t = this 
        // debugger
        return(
      
            <div> 
         
          <Card.Group>
           {this.state.currentImages.map(img =>  
           <Card id={img.id} onClick={this.props.handleImageBackPage} raised className="card" color='red' >
                <Card.Content>
                    <Card.Header>{img.input}</Card.Header>
                    <Card.Description>
                        {img.tarlanguage}
                    </Card.Description>
                </Card.Content>
              
                </Card>)}
           </Card.Group>
           
          </div>
        )
    }
}


