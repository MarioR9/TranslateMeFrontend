import React from '../../node_modules/react'
import ImageCard from './imageCard';

import { Card, Image, Modal, Button, Dropdown, Message, Icon} from '../../node_modules/semantic-ui-react'


export default class Images extends React.Component{


    render(){ 
      let t = this 
      debugger

        return(
          <div>
            {this.props.currentCardImages.map(img => <ImageCard key={img.id} handleCardImage={this.props.handleCardImage} handleToken={this.props.handleToken} handleCardState={this.handleCardState} img={img} cateId={this.props.cateId} currentImages={this.props.currentImages} handleImageRender={this.handleImageRender} handleImageBackPage={this.handleImageBackPage} allUsers={this.props.allUsers} currentUser={this.props.currentUser}/>)}
          </div>
        )
    }
}

