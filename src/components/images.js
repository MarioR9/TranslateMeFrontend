import React from '../../node_modules/react'
import { Card, Message, Header} from '../../node_modules/semantic-ui-react'



export default class Images extends React.Component{
    render(){
       
        return(
          <div>
              {this.props.img.map(img => 
               
                <Card raised image={img.url} />
                 
                )}
            </div>
        )
    }
}


