import React from '../../node_modules/react'
import { Card, Image, Transition} from '../../node_modules/semantic-ui-react'



export default class Images extends React.Component{
    state = { visible: true }
    toggleVisibility = () => this.setState(prevState => ({ visible: !prevState.visible }))


    handleBackCard=()=>{
        const { visible } = this.state
     return(   
         this.props.allUsers.find(user => user.id === this.props.currentUser.id).categories.map(s => s.images)[0].map(img =>  
            
            <Transition visible={visible} animation='scale' duration={500}> 
            <Card id={img.id} content={'Show'} onClick={this.toggleVisibility} raised className="card" color='red' >
         
            <Card.Content>
                {img.tarlanguage}  
            </Card.Content>      
            </Card>
        </Transition>)
        )
    }


    render(){
    //    let t = this
    //    debugger
    const { visible } = this.state
        return(
          <div>
           
    
            
          <Card.Group>
           {this.state.visible === false ? this.handleBackCard():null}
           {this.props.allUsers.find(user => user.id === this.props.currentUser.id).categories.map(s => s.images)[0].map(img =>  
           <Transition visible={visible} animation='scale' duration={500}> 
           <Card id={img.id} content={visible ? 'Hide' : 'Show'} onClick={this.toggleVisibility} raised className="card" color='red' >
                <Image src={img.url}/>
                <Card.Content>
                    <Card.Header>{img.icon}</Card.Header>
                    <Card.Description>
                        {img.tarlanguage}
                    </Card.Description>
                </Card.Content>
              
                </Card>
                </Transition>)}
           </Card.Group>
           
          </div>
        )
    }
}


