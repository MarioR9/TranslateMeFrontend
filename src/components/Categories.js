import React from '../../node_modules/react'
import { Card,Image, Button} from '../../node_modules/semantic-ui-react'


export default class Categories extends React.Component{
    constructor(props){
        super(props)
        this.state={
            active: false,
            open: false,
            cateId: 0
        }
    }
    show = dimmer => (e) => {
        this.setState({ 
            dimmer, open: true
        })}
    close = () => this.setState({ open: false })

    handleImageCollection=()=>{
        this.props.cate.images.map(img=> img).map(img=>img)
    }
    
    

    render(){

        return(
            <div> 
                
                <Card id={this.props.cate.id} onClick={this.props.handleImagePage} raised className="card" color='red' >
                    <Image src={this.props.cate.url}/>
                <Button id="deleteButton" onClick={()=>{this.props.handleCategoryDeletion(this.props.cate.id)}}>Delete</Button>
                <Card.Content>
                    <Card.Header>{this.props.cate.title}</Card.Header>
                    <Card.Description>
                        {this.props.cate.language}
                    </Card.Description>
                </Card.Content>
                </Card> 
            </div>
        )
    }
}