import React from '../../node_modules/react'
import AllCategories from './AllCategories'
import { Card } from '../../node_modules/semantic-ui-react'


export default class Home extends React.Component{
    constructor(){
        super()
        this.state={
            active: false,
            
        }
    }

    handleDimmer=()=>{
        this.setState({
            active: !this.state.active
        })
    }

    render(){
        return(
            <div>
                <div >
                   <div style={{height: "400px", 
                        backgroundImage: `url(Header.jpg)`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                        }}>
                            
                   </div>
                </div>
                <div id="divCardHome">       
                <Card.Group fluid stackable itemsPerRow={4} centered > 
                {this.props.categories.map(category => <AllCategories handleImagePage={this.props.handleImagePage} handleLoginPage={this.props.handleLoginPage} handleHomePageToProfile={this.props.handleHomePageToProfile} handleToken={this.props.handleToken} currentUser={this.props.currentUser} id={category.id} key={category.id}category={category}/>)}
                </Card.Group>
                </div>
            </div>
               )
    }
}