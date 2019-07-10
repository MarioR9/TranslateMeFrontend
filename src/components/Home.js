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
                <div style={{height: "250px", 
                        backgroundImage: `url(/languages.png)`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                        }}>
                   
                </div>
                <div>        
                <Card.Group fluid stackable itemsPerRow={5} centered > 
                
                {this.props.categories.map(category => <AllCategories handleImagePage={this.props.handleImagePage} handleLoginPage={this.props.handleLoginPage} handleHomePageToProfile={this.props.handleHomePageToProfile} handleToken={this.props.handleToken} currentUser={this.props.currentUser} id={category.id} key={category.id}category={category}/>)}
                </Card.Group>
                </div>
            </div>
               )
    }
}