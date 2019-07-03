import CLOUDNAME from '../../inventory'
import UPLOADPRESET from '../../inventory'

import React from '../../node_modules/react'
import { Card, Button } from '../../node_modules/semantic-ui-react'
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
   
            
    showUploadWidget=()=> {
    
    window.cloudinary.openUploadWidget({
       cloudName: CLOUDNAME,
       uploadPreset: UPLOADPRESET,
       sources: [
           "local",
           "dropbox",
           "camera",
           "facebook",
           "instagram",
           "url"
       ],
       showAdvancedOptions: false,
       cropping: true,
       showCompletedButton: true,
       autoUpload: false, 
       multiple: true,
       showUploadMoreButton: false,
       defaultSource: "local",
       text:{
        "Skip": {
            "title": "Upload"
                }
        },
       styles: {
           palette: {
               window: "#F5F5F5",
               sourceBg: "#FFFFFF",
               windowBorder: "#90a0b3",
               tabIcon: "#0094c7",
               inactiveTabIcon: "#69778A",
               menuIcons: "#0094C7",
               link: "#53ad9d",
               action: "#8F5DA5",
               inProgress: "#0194c7",
               complete: "#53ad9d",
               error: "#c43737",
               textDark: "#000000",
               textLight: "#FFFFFF"
           },
           fonts: {
               default: null,
               "'IBM Plex Sans', sans-serif": {
                   url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",
                   active: true
               }
           }
           
        }
        
    },
   
    (err, info) => {
      if (!err) {   
        
        console.log("Upload Widget event - ", info);
        if(info.event === "success"){
            console.log("URL " + info.info.url)
        fetch('http://localhost:3000/api/v1/images',{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            image: info.info.url
            })
        })
        .then(res=>res.json()).then(data => {
            // debugger
 
        this.handleFetchResponse(data)})
        }

            }
        });
     
    }
    handleFetchResponse=(data)=>{
        console.log(data)
        this.setState({
            scores: data.result.images[0].classifiers[0].classes.filter(img => img.score < 1.00 && img.score > 0.9), //.sort((a, b) => (a.score < b.score) ? 1 : -1)
          })
    }


    render(){

        return(
            <div >
                    <Card.Group>
                        <Button circular size='medium' primary icon='plus' onClick={()=>{this.showUploadWidget()}}>Upload files</Button>
                        {this.state.user.categories.map(cate => <Categories handleCurrentCategories={this.props.handleCurrentCategories} handleCategoryPage={this.props.handleCategoryPage} cate={cate}/>)}
                    </Card.Group>
            </div>
        )
    }
}