import React from '../../node_modules/react'
import ImagesBack from './imagesBack';
import ImagesFront from './imagesFront';
import { Card, Image, Modal, Button, Dropdown, Message, Icon} from '../../node_modules/semantic-ui-react'


export default class Images extends React.Component{
    constructor(){
        super()
        this.state ={ 
            currentImages:[],
            cardState: true
        }
    }
      handleCardState=()=>{
          this.setState({cardState: !this.state.cardState})
      }

    render(){
// let t  =this 
// debugger
        return(
          <div id="divCard">
            
             {this.state.cardState === true ? <ImagesFront handleCardImage={this.props.handleCardImage} handleToken={this.props.handleToken} handleCardState={this.handleCardState} img={this.props.img} cateId={this.props.cateId} currentImages={this.props.currentImages} handleImageRender={this.handleImageRender} handleImageBackPage={this.handleImageBackPage} allUsers={this.props.allUsers} currentUser={this.props.currentUser}/>
            : <ImagesBack handleCardImage={this.props.handleCardImage} img={this.props.img} handleToken={this.props.handleToken} handleCardState={this.handleCardState} currentImages={this.props.currentImages} cateId={this.props.cateId} handleImageBackPage={this.handleImageBackPage} allUsers={this.props.allUsers} currentUser={this.props.currentUser}/>}
          </div>
        )
    }
}

