// import CLOUDNAME from '../../inventory'
// import UPLOADPRESET from '../../inventory'

import React from '../../node_modules/react'
import { Card } from '../../node_modules/semantic-ui-react'
import Categories from './Categories';

export default class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.state = { 
            hightlight: false,
            scores:[],
            user: this.props.allUsers.find(user => user.id === this.props.currentUser.id)
        }
      
    }
   
            
    
    render(){

        return(
            <div >
                    <Card.Group>
                    <Card raised color='red' image="border.jpg" onClick={this.props.handleCreateCategory}/>
                        {this.state.user.categories.map(cate => <Categories handleCurrentCategories={this.props.handleCurrentCategories} handleCategoryPage={this.props.handleCategoryPage} cate={cate}/>)}
                    </Card.Group>
            </div>
        )
    }
}