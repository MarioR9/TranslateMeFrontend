import React from '../../node_modules/react'
import { Card, Image, Button} from '../../node_modules/semantic-ui-react'


export default class Categories extends React.Component{
    

    render(){
     
        return(
            <div> 
               
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
                    <Button id="deleteButton" onClick={()=>{this.props.handleCategoryDeletion(this.props.cate.id)}}>Delete</Button>
                
                    </Card.Content>
            </div>
        )
    }
}