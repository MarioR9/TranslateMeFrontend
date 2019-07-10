import React from '../../node_modules/react'
import { Card, Image, Button, Confirm} from '../../node_modules/semantic-ui-react'


export default class Categories extends React.Component{
    state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

    render(){
     
        return(
            <div> 
                 <Confirm content='Are you sure you want to delete this item?' open={this.state.open} onCancel={this.close} onConfirm={()=>{this.props.handleCategoryDeletion(this.props.cate.id)}} />
                <Card id={this.props.cate.id} data-name={this.props.cate.title} onClick={this.props.handleImagePage} raised className="card" color='red' >
                    <Image src={this.props.cate.url}/>
                <Card.Content>
                    <Card.Header>{this.props.cate.title}</Card.Header>
                    <Card.Description>
                        {this.props.cate.language}
                    </Card.Description>
                </Card.Content>
                </Card> 
                    <Card.Content extra>
                    <Button id="deleteButton" onClick={this.open}>Delete</Button>
                
                    </Card.Content>
            </div>
        )
    }
}