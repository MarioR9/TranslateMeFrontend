import React from '../../node_modules/react'
import { Card, Image, Modal, Button, Dropdown, Message, Icon} from '../../node_modules/semantic-ui-react'


                

export default class ImagesFront extends React.Component{
   

      handleCardDeletion=(e)=>{
     
        fetch(`http://localhost:3000/api/v1/images/${e.currentTarget.parentElement.children[1].children[0].id}`,{
        method: "Delete",
        headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                cateId: this.props.cateId,
                userId: this.props.currentUser.id
            })
        }).then(resp=>resp.json()).then(data => {
                this.props.handleToken(data)
            })
      }
    
    

    render(){
      let t = this 
      debugger
        return(
          <div>
              <Button id="deleteButton" onClick={this.handleCardDeletion}>Delete</Button>
          
        
          <Card.Group>
      
           <Card key={this.props.img.id} id={this.props.img.id} onClick={this.props.handleCardState} raised className="card" color='red' >
              <Image src={this.props.img.url}/>
            </Card>
          
           </Card.Group>
           
          </div>
        )
    }
}


