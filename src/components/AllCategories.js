import React from '../../node_modules/react'
import { Button, Dimmer, Header, Image, Card, Modal,Icon } from '../../node_modules/semantic-ui-react'



export default class AllCategory extends React.Component{
    constructor(){
        super()
        this.state={
            active: false,
            open: false,
            initialLanguage: "",
            categoryId: null

        }
    }
    show = dimmer => (e) => {
        this.setState({ 
            dimmer, open: true,
            categoryId: e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.id
        })}
    close = () => this.setState({ open: false })


    handleDimmer=()=>{
        this.setState({
            active: !this.state.active
        })
    }

    handleCategoryDup=(e)=>{
        debugger
        fetch('http://localhost:3000/api/v1/dupCategories',{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                    userId: this.props.currentUser.id,
                    cateId: e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.id,

                })
            }).then(resp =>resp.json()).then(data =>console.log(data))
    }

    render(){


        // let t= this 
        // debugger
        const { open, dimmer } = this.state
        const { active } = this.state
        const content = (
            <div>
                <Header as='h2' inverted>
                {this.props.category.title}
                </Header>
                <Header as='h2' inverted>
                {this.props.category.language}
                </Header>
                <Button circular size='huge' onClick={this.handleCategoryDup} primary icon='plus' />
                <Button circular size='huge' icon='heart outline' />
            </div>
             )

        return(
            <div>
                    <div>
                        <Modal dimmer={dimmer} open={open} onClose={this.close}>
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content image>
                            <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                            <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>We've found the following gravatar image associated with your e-mail address.</p>
                            <p>Is it okay to use this photo?</p>
                            </Modal.Description>
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

                <div>
                    <Card id={this.props.category.id} raised className="card" color='red' image={
                    <Dimmer.Dimmable
                        
                        as={Image}
                        dimmed={active}
                        dimmer={{ active, content }}
                        onMouseEnter={this.handleDimmer}
                        onMouseLeave={this.handleDimmer}
                        size='medium'
                        src={this.props.category.url}
                    />
                    } >
                    </Card> 
                    <div>
                    <Card.Content>
                        <Card.Header>{this.props.category.title}</Card.Header>
                        <Card.Description>
                            {this.props.category.language}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                       
                            <Icon name='user' />
                            {this.props.category.images.length} images
                       
                    </Card.Content>
                    </div>
                </div>
        </div>
        )
    }
}