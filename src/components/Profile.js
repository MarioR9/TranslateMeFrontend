import React from 'react'
import Images from './Images'
import { Card } from 'semantic-ui-react'
import {Image,CloudinaryContext} from 'cloudinary-react';
import Categories from './Categories';

export default class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.state = { 
            hightlight: false,
            scores:[],
            data: []
        }
      
    }
            
showUploadWidget=()=> {
    window.cloudinary.openUploadWidget({
       cloudName: "translateme",
       uploadPreset: "qks45ycm",
       sources: [
           "local",
           "dropbox",
           "camera",
           "facebook",
           "instagram",
           "url"
       ],
       showAdvancedOptions: false,
       cropping: false,
       multiple: true,
       singleUploadAutoClose: false,
       defaultSource: "local",
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
        fetch('http://localhost:3000/api/v1/users',{
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
        // debugger
        this.setState({
            scores: data.result.images[0].classifiers[0].classes.filter(img => img.score < 1.00 && img.score > 0.9), //.sort((a, b) => (a.score < b.score) ? 1 : -1)
            data: data
          })
   
    }
    render(){

       
 
        return(
            <div>
                <Card.Group>
                    <button raised className="card" id="upload_widget" onClick={()=>{this.showUploadWidget()}} class="cloudinary-button">Upload files</button>

                
                    <Categories image={this.state.data} scores={this.state.scores}/>
                </Card.Group>
            </div>
        )
    }
}