import React from 'react'
import axios from 'axios'

export default class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.state = { 
            hightlight: false,
            scores:[],
            data: [],
            selectedFile: null
        }
      
    }
    uploadHandler = () => {
        const formData = new FormData()
        formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name )
        axios.post(, formData, {
            onUploadProgress: progressEvent => {
              console.log(progressEvent.loaded / progressEvent.total)
            }
          })
        }

        fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })
        }

        uploadHandler = () => {
        console.log(this.state.selectedFile)
        }
        // fetch=()=>{
        //         fetch('http://localhost:3000/api/v1/users',{
        //         method: "POST",
        //         headers: {"Content-type": "application/json"},
        //         body: JSON.stringify({
        //             image: info.info.url
        //             })
        //         })
        //         .then(res=>res.json()).then(data => {
        //             // debugger
        
        //         this.handleFetchResponse(data)})
        
        //     }
        //     handleFetchResponse=(data)=>{
        //         console.log(data)
        //         // debugger
        //         this.setState({
        //             scores: data.result.images[0].classifiers[0].classes.filter(img => img.score < 1.00 && img.score > 0.9), //.sort((a, b) => (a.score < b.score) ? 1 : -1)
        //             data: data
        //         })
        
        //     }
            render(){

       
 
        return(
            <div>
               <input type="file" onChange={this.fileChangedHandler}/>
               <button onClick={this.uploadHandler}>Upload!</button>
            </div>
        )
    }
}