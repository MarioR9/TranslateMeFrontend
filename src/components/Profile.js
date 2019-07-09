// import CLOUDNAME from '../../inventory'
// import UPLOADPRESET from '../../inventory'

import React from '../../node_modules/react'
import { Card, Modal, Form, Button, Icon, Menu, Segment, Sidebar} from '../../node_modules/semantic-ui-react'
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
            visible: false,
            dimmer: null,
            currentImages: []
        }
      
    }
    handleHideClick = () => this.setState({ visible: false })
    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })
  
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
            url: "https://res.cloudinary.com/translateme/image/upload/v1562562578/DefaultPics/luc79f4qxczxhzenag6y.png"
            })
        })
        .then(res=>res.json()).then(data => {
            // debugger
           this.props.handleToken(data)
        this.props.handleCategoryPage()
        this.setState({open: false})    
    })
    }

    handleCategoryDeletion=(categoryid)=>{
    
        fetch(`http://localhost:3000/api/v1/categories/${categoryid}`,{
        method: "DELETE",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            userId: this.props.currentUser.id
            })
        }).then(resp => resp.json()).then(data => this.props.handleRenderNewCategories(data))
    }

    render(){
        const { open, dimmer } = this.state
        const { visible } = this.state
        return(
            <div >
  <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            User
          </Button>

        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='user circle' />
              Account
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='settings' />
              settings
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='wechat' />
              Chats
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
            <Card.Group>
                    <Card raised color='red' image="plus.jpg" onClick={this.show('blurring')}/>
                        {this.props.currentUserCategories.map(cate => <Categories key={cate.id} handleCategoryDeletion={this.handleCategoryDeletion} handleCateImages={this.props.handleCateImages} handleImagePage={this.props.handleImagePage} handleCurrentCategories={this.props.handleCurrentCategories} handleCategoryPage={this.props.handleCategoryPage} cate={cate}/>)}
                    </Card.Group>

            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

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
                   
            </div>
        )
    }
}