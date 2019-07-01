import React from 'react'
import Images from './Images'
import { Card } from 'semantic-ui-react'

export default class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.state = { 
            hightlight: false,
            data:[],
            image: []
        }

        this.fileInputRef = React.createRef()
    
        this.openFileDialog = this.openFileDialog.bind(this)
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.onDragLeave = this.onDragLeave.bind(this)
        this.onDrop = this.onDrop.bind(this)
      }
    
      openFileDialog() {
        if (this.props.disabled) return
        this.fileInputRef.current.click()
      }
    
      onFilesAdded(evt) {
        let img = evt.target.files
        var imageData = new FormData()
       
        for (const file of evt.target.files) {
            imageData.append('files',file,file.name)
        }
       
        
        // if (this.props.disabled) return
        // const files = evt.target.files
        // if (this.props.onFilesAdded) {
        //   const array = this.fileListToArray(files)
        //   this.props.onFilesAdded(array)
        // }
        fetch('http://localhost:3000/api/v1/users',{
            method: "POST",
            body: imageData
           	}).then(res=>res.json()).then(data => {
//   debugger
                this.handleFetchResponse(data)})
            
        }
    
      handleFetchResponse=(data)=>{
          console.log(data)
          debugger
          this.setState({
              data: data.result.images[0].classifiers[0].classes.filter(img => img.score < 1.00 && img.score > 0.9), //.sort((a, b) => (a.score < b.score) ? 1 : -1)
              image: data
            })
        // var imageData = new FormData()
       
        // for (const file of evt.target.files) {
        //     imageData.append('files',file,file.name)
        // }
       

      }  


      onDragOver(evt) {
        evt.preventDefault()
    
        if (this.props.disabled) return
    
        this.setState({ hightlight: true })
      }
    
      onDragLeave() {
         
        this.setState({ hightlight: false })
      }
    
      onDrop(event) {
        event.preventDefault()
    
        if (this.props.disabled) return
    
        const files = event.dataTransfer.files
        if (this.props.onFilesAdded) {
          const array = this.fileListToArray(files)
          this.props.onFilesAdded(array)
        }
        this.setState({ hightlight: false })
      }
    
      fileListToArray(list) {
        const array = []
        for (var i = 0; i < list.length; i++) {
          array.push(list.item(i))
        }
 
        return array
      }


    render(){
        return(
            <div>
                <div
                
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
                >
                <input
                ref={this.fileInputRef}
                className="FileInput"
                type="file"
                multiple
                onChange={this.onFilesAdded}
                />
                <img
                alt="upload"
                className="Icon"
                src="upload-icon-3.png"
                />
                <span>Upload Files</span>
                
            </div>
            <div >
                    <Card.Group itemsPerRow={6}>
                       {this.state.data.map(image => <Images pic={this.state.image} image={image}/>)}
                       
                    </Card.Group>
                </div>
        </div>
        )
    }
}