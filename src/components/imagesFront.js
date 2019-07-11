import React from '../../node_modules/react'
import { Card, Image, Segment,Label,Confirm} from '../../node_modules/semantic-ui-react'


                

export default class ImagesFront extends React.Component{
  state = { open: false, cardId: null }

  open = (e) => { 
    this.setState({ open: true, cardId: e.currentTarget.parentElement.parentElement.id })}
  close = () => this.setState({ open: false })


      handleCardDeletion=(e)=>{
 
        fetch(`http://localhost:3000/api/v1/images/${this.state.cardId}`,{
        method: "Delete",
        headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                cateId: this.props.cateId,
                userId: this.props.currentUser.id
            })
        }).then(resp=>resp.json()).then(data => {
                this.props.handleCardImage(this.props.cateId)
            })
      }
    
    

    render(){
    
        return(
          <div>
            <Card.Group>
            <Confirm content='Are you sure you want to delete this item?' open={this.state.open} onCancel={this.close} onConfirm={this.handleCardDeletion} />
            <Card className="ui each imageCard" key={this.props.img.id} id={this.props.img.id} onClick={this.props.handleCardState} raised color='red'>
            <Segment>
            <Label  as='a' color='red' ribbon='right' onClick={this.open}>Delete</Label>
              <Image  src={this.props.img.url}/>
              </Segment>
            </Card>
            
          
            </Card.Group>
         
        
           
          </div>
        )
    }
}


