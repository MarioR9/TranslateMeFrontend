import React from 'react'
import AllCategories from './AllCategories'
import { Card } from 'semantic-ui-react'



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
            
                <Card.Group> 
                {this.props.categories.map(category => <AllCategories id={category.id} key={category.id}category={category}/>)}
                </Card.Group>

            </div>
               )
    }
}