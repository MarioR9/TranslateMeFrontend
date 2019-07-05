import React from '../../node_modules/react'
import { Card, Button } from '../../node_modules/semantic-ui-react'



export default class ImagesBack extends React.Component{
  
    render(){
        // let t = this 
        // debugger
        return(
          <div> 
        <Button raised circular primary>ADD new Image</Button>
          <Card.Group>
           {this.props.allUsers.find(user => user.id === this.props.currentUser.id).categories.map(s => s.images)[0].map(img =>  
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


