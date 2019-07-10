import React, {Fragment} from '../../node_modules/react'
import { Button, Dimmer, Header, Image, Card, Modal} from '../../node_modules/semantic-ui-react'



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
      if(localStorage.getItem('token')){
        fetch('http://localhost:3000/api/v1/dupCategories',{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                    userId: this.props.currentUser.id,
                    cateId: e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.id,

                })
            }).then(resp =>resp.json()).then(data =>{
                this.props.handleToken(data)})
            }else{
                alert("Login First")
                this.props.handleLoginPage()
            }
    }

    render(){


        // let t= this 
        // debugger
        const { open, dimmer } = this.state
        const { active } = this.state
        const content = (
            <div >
                <Header as='h2' inverted>
                {this.props.category.title}
                </Header>
                <Header as='h2' inverted>
                {this.props.category.language}
                </Header>
                <Button circular size='huge' onClick={this.handleCategoryDup} primary icon='plus' />
                {/* <Button circular size='huge' icon='heart outline' /> */}
            </div>
             )

        return(
          <Fragment>
                    <Card 

                    id={this.props.category.id} data-name={this.props.category.title} raised image={
                    <Dimmer.Dimmable
                        as={Image}
                        dimmed={active}
                        dimmer={{ active, content }}
                        onMouseEnter={this.handleDimmer}
                        onMouseLeave={this.handleDimmer}
                        size='medium'
                        src={this.props.category.url}
                    />
                    } />
                  
                   
     
              
          </Fragment>
        )
    }
}

