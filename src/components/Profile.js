// import CLOUDNAME from '../../inventory'
// import UPLOADPRESET from '../../inventory'

import React from '../../node_modules/react'
import { Card, Modal, Form, Button } from '../../node_modules/semantic-ui-react'
import Categories from './Categories';

export default class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.state = { 
            title: "",
            language: "",
            hightlight: false,
            scores:[],
            open: false,
            dimmer: "",
            user: this.props.allUsers.find(user => user.id === this.props.currentUser.id)
        }
      
    }
    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })
    handleTitle = (e) => this.setState({title: e.currentTarget.value})        
    handleLanguage = (e) => this.setState({language: e.currentTarget.value}) 

    handleFetch=()=>{
        fetch('http://localhost:3000/api/v1/categories',{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            title: this.state.title,
            language: this.state.language,
            userId: this.props.currentUser.id,
            url: "https://res.cloudinary.com/translateme/image/upload/v1562301192/DefaultPics/ktigb3cc7ixw3kydp9te.png"
            })
        })
        .then(res=>res.json()).then(data => {
            // debugger
           this.props.handleToken(data)
        console.log(data)})
    }
    render(){
        const { open, dimmer } = this.state
        
        return(
            <div >
              <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>Add a New Category</Modal.Header>
                <Modal.Content image>
                <Form>
                    <Form.Field>
                    <label>Title</label>
                    <input onChange={this.handleTitle} placeholder='Title'/>
                    </Form.Field>
                    <Form.Field>
                    <label>Language</label>
                    <input onChange={this.handleLanguage} placeholder='Language'/>
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                </Form>
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
                    onClick={this.handleFetch}
                    />
                </Modal.Actions>
            </Modal>
                    <Card.Group>
                    <Card raised color='red' image="border.jpg" onClick={this.show('blurring')}/>
                        {this.props.currentUserCategories.map(cate => <Categories handleCateImages={this.props.handleCateImages} handleImagePage={this.props.handleImagePage} handleCurrentCategories={this.props.handleCurrentCategories} handleCategoryPage={this.props.handleCategoryPage} cate={cate}/>)}
                    </Card.Group>
            </div>
        )
    }
}