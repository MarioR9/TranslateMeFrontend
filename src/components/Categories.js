import React from '../../node_modules/react'
import { Card, Image, Modal, Button, Dropdown, Message, Icon} from '../../node_modules/semantic-ui-react'



let languages = [{key:'Arabic',text:'Arabic', value: "ar"},
                 {key:'Catalan',text:'Catalan', value: "ca"},
                 {key:'Chinese_Simplified',text:'Chinese_Simplified', value: "zh"},
                 {key:'Chinese_Traditional',text:'Chinese_Traditional',value: "zh-TW"},                
                 {key:'Czech',text:'Chuvash', value:"cs"},
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
                 "ca":'Catalan',
                 "zh":'Chinese_Simplified',
                 "zh-Tw":'Chinese_Traditional',                
                 "cs":'Czech',
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


export default class Categories extends React.Component{
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
            displayOgLanguage: "Select a language",
            displayTgLanguage: "Select a language",
            selectedWord: "",
            listOfWords:[],
            listOfInitalWords:[],
            translatedWord: [],
            currentImages: [],
            color: "",
            languageTarget: [],
            currentCateId: 0
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
        // debugger
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
           sources: ["local","dropbox","camera","facebook","instagram","url"],
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
            this.setState({imgUrl: info.info.url}) 
            fetch('http://localhost:3000/api/v1/visualRecognition',{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                imgUrl: info.info.url,
                oglanguage: this.state.oglanguage})}).then(res=>res.json()).then(data => {
         
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
                tarlanguage: this.state.displayTgLanguage,
                imgUrl: this.state.imgUrl,
                cateId: this.state.currentCateId
            })
        }).then(fetch('http://localhost:3000/api/v1/findCategory',{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                cateId: this.state.currentCateId,
               })
            }).then(resp=>resp.json()).then(data => {
              
                this.setState({currentImages: data})}))
            
        })
    }
    handleAddedImg=()=>{
        fetch('http://localhost:3000/api/v1/findCategory',{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                cateId: this.state.currentCateId,
               })
            }).then(resp=>resp.json()).then(data => {
              
                this.setState({currentImages: data})})
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
          this.setState({ oglanguage: ogLan.value, displayOgLanguage: e.currentTarget.textContent })
          fetch('http://localhost:3000/api/v1/findModel',{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                    oglanguage: ogLan
                })
            }).then(resp=>resp.json()).then(data=>{this.handleTargetLanguage(data)})
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
        this.setState({languageTarget: arr, displayTgLanguage: "Select a language" })

    }


    
    
    handleChangeTglanguage = (e) => {
      
        if(e.currentTarget.textContent === "Select a languageEnglish"){
            return null
        }  
        let tarLan = languages.find(lan => lan.key === e.currentTarget.textContent)
      this.setState({ tglanguage: tarLan.value, displayTgLanguage: e.currentTarget.textContent })

    
    }    
    handleWordToTranslate=(e)=>{
        this.setState({selectedWord: e.currentTarget.children[0].textContent})
        
    }
    open =(e)=>{
        
            this.setState({open: true, currentCateId: e.currentTarget.parentElement.parentElement.children[0].id})
    }

    close = () => this.setState({ open3: false , open2 :false, open: false })

    open2 = () => this.setState({ open2: true })
    
    open3 = () => this.setState({ open3: true })
    
    color = () => this.setState({color: "red"})
    

    render(){
        const { open, dimmer,open2, open3} = this.state
     
        return(
            <div> 
                <Modal dimmer={dimmer} open={open3} onClose={this.close}>
             <Modal.Header>All Images</Modal.Header>
             <Modal.Content >
             <Card raised image={this.state.imgUrl} />
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
            
            {this.state.response.map(info =>   <Message  color={this.color} id="messageSelection" class="ui floating message" raised onClick={this.handleWordToTranslate} info>
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
                
                <Card id={this.props.cate.id} onClick={this.props.handleImagePage} raised className="card" color='red' >
                    <Image src={this.props.cate.url}/>
                <Card.Content>
                    <Card.Header>{this.props.cate.title}</Card.Header>
                    <Card.Description>
                        {this.props.cate.language}
                    </Card.Description>
                </Card.Content>
                </Card> 
                    <Card.Content extra>
                    <Button id="deleteButton" onClick={()=>{this.props.handleCategoryDeletion(this.props.cate.id)}}>Delete</Button>
                     <Button id="addButton" onClick={this.open}><Icon name="plus"/>Add New Image</Button>
                
                    </Card.Content>
            </div>
        )
    }
}