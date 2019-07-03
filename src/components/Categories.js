import React from 'react'
import { Card } from 'semantic-ui-react'
import Images from './Images'

export default class Categories extends React.Component{

    handleImages=()=>{
        return (
            <div>
                {this.props.cate.images.map(img => <Images img={img}/>)}
            </div>
        )
    }
    render(){
        // let t = this 
        // debugger
        return(
            <div>
                <Card id={this.props.cate.id} raised className="card" color='red' image={this.props.cate.url}>
                </Card> 
            </div>
        )
    }
}