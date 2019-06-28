import React from 'react'
import Category from '../components/Categories'
import { Card } from 'semantic-ui-react'


export default class Home extends React.Component{

  render() {

    return (
        
        <Card.Group itemsPerRow={6}>
            <Category />
            <Category/>
            <Category/>
            <Category/>
        </Card.Group>
      
    )
  }
}