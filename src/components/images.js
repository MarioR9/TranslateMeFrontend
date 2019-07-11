import React from '../../node_modules/react'
import ImageCard from './imageCard';

import { Card, Modal, Button, Dropdown, Message, Icon, Progress,Label,Header} from '../../node_modules/semantic-ui-react'


let languages = [{key:'Arabic',text:'Arabic', value: "ar"},
                 {key:'Chinese_Simplified',text:'Chinese_Simplified', value: "zh"},
                 {key:'Chinese_Traditional',text:'Chinese_Traditional',value: "zh-TW"},                
                 {key:'Danish',text:'Danish', value: "da"},
                 {key:'Dutch',text:'Dutch', value: "nl"},
                 {key:'English',text:'English', value: "en"},
                 {key:'Finnish',text:'Finnish', value: "fi"},
                 {key:'French',text:'French', value: "fr"},          
                 {key:'German',text:'German', value: "de"},
                 {key:'Greek',text:'Greek', value: "el"},          
                 {key:'Hebrew',text:'Hebrew', value: "he"},
                 {key:'Hindi',text:'Hindi', value: "hi"},
                 {key:'Hungarian',text:'Hungarian', value: "hu"},                
                 {key:'Italian',text:'Italian', value: "it"},
                 {key:'Japanese',text:'Japanese', value: "ja"},              
                 {key:'Korean',text:'Korean', value: "ko"},               
                 {key:'Norwegia_Bokmal',text:'Norwegia_Bokmal', value: "nb"},           
                 {key:'Polish',text:'Polish', value: "pl"},
                 {key:'Portuguese',text:'Portuguese', value: "pt"},                
                 {key:'Russian',text:'Russian', value: "ru"},               
                 {key:'Spanish',text:'Spanish', value: "es"},
                 {key:'Swedish',text:'Swedish', value: "sv"},                
                 {key:'Turkish',text:'Turkish', value: "tr"}]

                 
let languages2 = {'ar':'Arabic',
                 "zh":'Chinese_Simplified',
                 "zh-Tw":'Chinese_Traditional',
                 "da":'Danish', 
                 "nl": 'Dutch',
                 "en":'English',
                 "fi":'Finnish',
                 "fr": 'French',          
                 "de":'German',
                 "el":'Greek',          
                 "he":'Hebrew',
                 "hi":'Hindi',
                 "hu": 'Hungarian',                
                 "it":'Italian',
                 "ja": 'Japanese',              
                 "ko":'Korean',               
                 "nb": 'Norwegia_Bokmal',           
                 "pl":'Polish',
                 "pt":'Portuguese',                
                 "ru":'Russian',               
                 "es":'Spanish',
                 "sv":'Swedish',                
                 "tr":'Turkish'}



export default class Images extends React.Component{
  constructor(props){
    super(props)
    this.state={
        active: false,
        open: false,
        cateId: 0,
        response: [],
        oglanguage: "",
        tglanguage: "",
        imgUrl: "",
        open2: false,
        open3: false,
        dimmer: null,
        displayOgLanguage: "Select Your Language",
        displayTgLanguage: "Select Target Language",
        selectedWord: "",
        listOfWords:[],
        listOfInitalWords:[],
        translatedWord: [],
        currentImages: [],
        color: "",
        languageTarget: [],
        currentCateId: 0,
        startBarState: "",
        percent: 0,
        initialWordSelection: true,
        resultWordSelection: false,
        disabled: true
    }
}

show = dimmer => (e) => {
    this.setState({ 
        dimmer, open: true
    })}
close = () => this.setState({ open: false })

handleImageCollection=()=>{
    this.props.cate.images.map(img=> img).map(img=>img)
}

handleCardDeletion=(e)=>{
   
    fetch(`http://localhost:3000/api/v1/images/${e.currentTarget.parentElement.id}`,{
    method: "Delete",
    headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            cateId: this.props.cateId,
            userId: this.props.currentUser.id
        })
    }).then(resp=>resp.json()).then(data => {
            this.props.handleToken(data)
        })
  }

showUploadWidget=()=> {

    window.cloudinary.openUploadWidget({
       cloudName: "translateme",
       uploadPreset: "qks45ycm",
       inlineContainer: "#lewidget",
       sources: ["local","dropbox","facebook","instagram","url"],
       showAdvancedOptions: false,
       cropping: true,
       upload: false,
       uploader: false,
       showCompletedButton: true,
       multiple: true,
       showUploadMoreButton: false,
       defaultSource: "local",
       styles: { palette: {window: "#F5F5F5",sourceBg: "#FFFFFF",windowBorder: "#90a0b3",tabIcon: "#0094c7",inactiveTabIcon: "#69778A",menuIcons: "#0094C7",link: "#53ad9d",action: "#8F5DA5",inProgress: "#0194c7",complete: "#53ad9d",error: "#c43737",textDark: "#000000",textLight: "#FFFFFF"},
           fonts: {default: null, "'IBM Plex Sans', sans-serif": {url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",active: true}}}
    },
    (err, info) => {
      if (!err) {   
       console.log("Upload Widget event - ", info);
        if(info.event === "success"){
        this.toggle()
        this.setState({imgUrl: info.info.url}) 
        fetch('http://localhost:3000/api/v1/visualRecognition',{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            imgUrl: info.info.url,
            oglanguage: this.state.oglanguage})}).then(res=>res.json()).then(data => {
                this.toggle2()
                this.handleFetchResponse(data)})}}
    });
}


handleTranslation=()=>{
    
    fetch('http://localhost:3000/api/v1/translate',{
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
            oglanguage: this.state.oglanguage,
            tglanguage: this.state.tglanguage,
            selectedWord: this.state.selectedWord
        })
    }).then(resp => resp.json()).then(data =>{
      
    this.setState({translatedWord: data.translation.translations[0].translation, 
            open3: true})
    fetch('http://localhost:3000/api/v1/images',{
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
            input: this.state.translatedWord,
            orglanguage:this.state.displayOgLanguage,
            original: this.state.selectedWord,
            tarlanguage: this.state.displayTgLanguage,
            imgUrl: this.state.imgUrl,
            cateId: this.props.cateId
        })
    }).then(fetch('http://localhost:3000/api/v1/findCategory',{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            cateId: this.props.cateId,
        })
    }).then(resp=>resp.json()).then(data => {
        
            this.props.handleCardImage(this.props.cateId)}))
        
    })
}
handleAddedImg=()=>{
    this.props.handleCardImage(this.props.cateId)
    this.close()       
}
handleFetchResponse=(data)=>{
    if(data.translation){
    
    let newarr = []
    let array = data.translation
    for(let i=0;i<array.length; i++){
    newarr.push(array[i].translations[0].translation)
    }
    // debugger
    this.setState({ 
            dimmer: 'blurring', 
            open2: true,
            response: newarr,
            listOfWords: data.arrOfRes, //.sort((a, b) => (a.score < b.score) ? 1 : -1)
            listOfInitalWords: newarr
    })
    }else{
    this.setState({ 
        dimmer: 'blurring', 
        open2: true,
        response: data.arrOfRes,
        listOfWords: data.arrOfRes, //.sort((a, b) => (a.score < b.score) ? 1 : -1)
        listOfInitalWords: data.arrOfRes})
    }
}

handleChangeOglanguage = (e) => {
    let ogLan = languages.find(lan => lan.key === e.currentTarget.textContent)
        if(ogLan === undefined){
            return null
         }else{
      this.setState({ oglanguage: ogLan.value, displayOgLanguage: e.currentTarget.textContent })
      fetch('http://localhost:3000/api/v1/findModel',{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
                oglanguage: ogLan
            })
        }).then(resp=>resp.json()).then(data=>{this.handleTargetLanguage(data)})
    }
}

handleTargetLanguage=(data)=>{ 
   
    let target = data.models.models.map(lang => lang.target)
    let arr = []
    let obj = {}
    for(let i = 0; i < Object.keys(languages2).length; i++){
        if(languages2[target[i]]){
            obj = {key: languages2[target[i]], text: languages2[target[i]], value: target[i]}
            arr.push(obj)
        }
    }
    this.setState({languageTarget: arr, displayTgLanguage: "Select Target Language" })

}




handleChangeTglanguage = (e) => {
    let tarLan = languages.find(lan => lan.key === e.currentTarget.textContent)
    if(tarLan === undefined){
        return null
      }else{
  this.setState({ tglanguage: tarLan.value, displayTgLanguage: e.currentTarget.textContent })

    }
}    
handleWordToTranslate=(e)=>{
    this.setState({selectedWord: e.currentTarget.children[0].textContent, initialWordSelection: false,resultWordSelection: true, disabled:false})
    
}
open =(e)=>{
    
        this.setState({open: true, currentCateId: e.currentTarget.parentElement.parentElement.children[0].id})
}

close = () => this.setState({ open3: false , open2 :false, open: false })

open2 = () => this.setState({ open2: true })

open3 = () => this.setState({ open3: true })

color = () => this.setState({color: "red"})

toggle = () => this.setState(prevState => ({ percent: prevState.percent === 0 ? 50 : 0,startBarState: "Please wait..." }))

toggle2 = () => this.setState(prevState => ({ percent: prevState.percent === 50 ? 100 : 0,startBarState: "Success" }))

    render(){ 
    
      const { open, dimmer,open2, open3} = this.state
    //   let t = this
    //   debugger
        return(
          <div>
            
             <Button as='div' labelPosition='right'>
                  
                  <Label as='a' basic color='green' pointing='right' onClick={this.open}>
                      <Icon name="Add New Image"/> Add New Image
                  </Label>
                  </Button>
             <Header as='h2' image='https://cdn4.iconfinder.com/data/icons/ui-13/100/tags-512.png' content={this.props.cateTitle} />
            <div>
             <Modal dimmer={dimmer} open={open3} onClose={this.close}>
             <Modal.Header>Translation</Modal.Header>
             <Modal.Content >
             <Card raised centered image={this.state.imgUrl} />
             <Message raised class="ui floating message" positive>
                 <Message.Header>{this.state.translatedWord}</Message.Header>
              </Message>
             </Modal.Content>
             <Modal.Actions>  
                 <Button
                 color='red'
                 positive
                 icon='checkmark'
                 content="Continue"
                 onClick={this.handleAddedImg} //re-render new images 
                 />
             </Modal.Actions>          
            </Modal>

            <Modal dimmer={dimmer} open={open2} onClose={this.close}>
             <Modal.Header><Icon name="language"/>What do you mean?</Modal.Header>
             <Modal.Content >
            
            {this.state.response.map(info =>   <Message   id="messageSelection" class="ui floating message" raised onClick={this.handleWordToTranslate} info={this.state.initialWordSelection} success={this.state.resultWordSelection}>
                 <Message.Header>{info}</Message.Header>
              </Message>)}

             </Modal.Content>


             <Modal.Actions>
                 <Button color='black' onClick={this.close}>
                 Nope
                 </Button>
                 <Button
                 positive
                 icon='checkmark'
                 labelPosition='right'
                 content="Translate"
                 onClick={this.handleTranslation}
                 />
             </Modal.Actions>
             </Modal>

              <Modal dimmer={dimmer} open={open} >
              <Modal.Header><Icon name="language"/>Select a Language </Modal.Header>
              <Modal.Content>
              <Progress percent={this.state.percent} success active/><h3>{this.state.startBarState}</h3>
              </Modal.Content> 
              <Modal.Content image>
                  <Dropdown 
                  onChange={this.handleChangeOglanguage}
                  button
                  className='icon'
                  floating
                  labeled
                  icon='world'
                  scrolling
                  options={languages}
                  text={this.state.displayOgLanguage}
                  /> 
              <Dropdown
                onChange={this.handleChangeTglanguage}
                button
                className='icon'
                floating
                labeled
                scrolling
                icon='world'
                options={this.state.languageTarget}
                text={this.state.displayTgLanguage}
                />
            </Modal.Content>
            <Modal.Content id="lewidget" >
             <Button circular size='medium' primary onClick={()=>{this.showUploadWidget()}}>Upload files</Button>
             </Modal.Content>
          
            <Modal.Actions>
                <Button color='black' onClick={this.close}>
                Nope
                </Button>
            </Modal.Actions>
            </Modal>
      
            <Card.Group>
            {this.props.currentCardImages.map(img => <ImageCard  key={img.id} handleCardImage={this.props.handleCardImage} handleToken={this.props.handleToken} handleCardState={this.handleCardState} img={img} cateId={this.props.cateId} currentImages={this.props.currentImages} handleImageRender={this.handleImageRender} handleImageBackPage={this.handleImageBackPage} allUsers={this.props.allUsers} currentUser={this.props.currentUser}/>)}
            </Card.Group>
            
            </div>


          </div>
        )
    }
}

