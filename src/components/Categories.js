import React from '../../node_modules/react'
import { Card, Header,Image, Icon, Modal, Button } from '../../node_modules/semantic-ui-react'
import Images from './Images'

export default class Categories extends React.Component{
    constructor(props){
        super(props)
        this.state={
            active: false,
            open: false
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
  const { open, dimmer } = this.state
        return(
            <div> 
                <div>
                        <Modal dimmer={dimmer} open={open} onClose={this.close}>
                        <Modal.Header>All Images</Modal.Header>
                        <Modal.Content >
                            <Card.Group>
                            {this.props.cate.images.map(img=> img).map(img =><Card raised >
                                <Image src={img.url}/>
                                <Card.Content>
                                <Card.Header>{img.input}</Card.Header>
                                <Card.Description>
                                 Og-language: {img.og_language}
                                </Card.Description>
                                <Card.Description>
                                 Target-language: {img.tr_language}
                                 </Card.Description>
                                 <Card.Description>
                                 output: {img.output}
                                 </Card.Description>
                                </Card.Content>   
                            </Card>)}
                            </Card.Group>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={this.close}>
                            Nope
                            </Button>
                            <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Create"
                            onClick={this.close}
                            />
                        </Modal.Actions>
                        </Modal>
                    </div>
             
                
                <Card id={this.props.cate.id} onClick={this.show('blurring')} raised className="card" color='red' >
                    <Image src={this.props.cate.url}/>
                <Card.Content>
                    <Card.Header>{this.props.cate.title}</Card.Header>
                    <Card.Description>
                        {this.props.cate.language}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        {this.props.cate.images.length} images
                    </a>
                </Card.Content>
                </Card> 
            </div>
        )
    }
}