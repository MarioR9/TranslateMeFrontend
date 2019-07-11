import React ,{Fragment} from '../../node_modules/react'
import { Card, Image, Button, Confirm,Label ,Icon} from '../../node_modules/semantic-ui-react'


export default class Categories extends React.Component{
    state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

    render(){
     
        return(
            <Fragment> 
                 <Confirm content='Are you sure you want to delete this item?' open={this.state.open} onCancel={this.close} onConfirm={()=>{this.props.handleCategoryDeletion(this.props.cate.id)}} />
                <Card className="ui raised card Home" id={this.props.cate.id} data-name={this.props.cate.title} onClick={this.props.handleImagePage} raised color='red' >
                    <Image src={this.props.cate.url}/>
                <Card.Content>
                    <Card.Header textAlign="center">{this.props.cate.title}</Card.Header>
                    <Card.Description textAlign="center">
                        {this.props.cate.language}
                    </Card.Description>
                </Card.Content>
                </Card> 
                    <Card.Content extra>
                    <div className='ui two buttons'>
            
                   
                    </div>
                    <Button as='div' labelPosition='right'>
                  
                    <Label as='a' basic color='red' pointing='left' onClick={this.open}>
                        <Icon name="delete"/> Delete
                    </Label>
                    </Button>
                
                    </Card.Content>
            </Fragment>
        )
    }
}