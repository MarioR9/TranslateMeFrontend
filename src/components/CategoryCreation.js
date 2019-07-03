// import CLOUDNAME from '../../inventory'
// import UPLOADPRESET from '../../inventory'


import React from 'react'
import { Card, Button, Form, Dropdown } from '../../node_modules/semantic-ui-react'

let languages = [
  {key:'Afrikaans',text:'Afrikaans',value: "af"},
  {key:'Albanian',text:'Albanian', value: "sq"},
  {key:'Arabic',text:'Arabic', value: "ar"},
  {key:'Armenian',text:'Armenian', value: "hy"},
  {key:'Azerbaijani',text:'Azerbaijani', value: "az"},
  {key:'Bashkir',text:'Bashkir', value: "ba"},
  {key:'Basque',text:'Basque', value: "eu"},
  {key:'Belarusian',text:'Belarusian', value: "be"},
  {key:'Bengali',text:'Bengali', value: "bn"},
  {key:'Bosnian',text:'Bosnian', value: "bs"},
  {key:'Bulgarian',text:'Bulgarian', value: "bg"},
  {key:'Central_Khmer',text:'Central_Khmer', value: "km"},
  {key:'Chinese_Simplified',text:'Chinese_Simplified', value: "zh"},
  {key:'Chinese_Traditional',text:'Chinese_Traditional',value: "TW"},
  {key:'Chuvash',text:'Chuvash',value:"cv"},
  {key:'Czech',text:'Chuvash', value:"cv"},
  {key:'Danish',text:'Danish', value: "da"},
  {key:'Dutch',text:'Dutch', value: "nl"},
  {key:'English',text:'English', value: "en"},
  {key:'Esperanto',text:'Esperanto', value: "eo"},
  {key:'Estonian',text:'Estonian', value: "et"},
  {key:'Finnish',text:'Finnish', value: "fi"},
  {key:'French',text:'French', value: "fr"},
  {key:'Georgian',text:'Georgian', value: "ka"},
  {key:'German',text:'German', value: "de"},
  {key:'Greek',text:'Greek', value: "el"},
  {key:'Gujarati',text:'Gujarati', value: "gu"},
  {key:'Haitian',text:'Haitian', value: "ht"},
  {key:'Hebrew',text:'Hebrew', value: "he"},
  {key:'Hindi',text:'Hindi', value: "hi"},
  {key:'Hungarian',text:'Hungarian', value: "hu"},
  {key:'Icelandic',text:'Icelandic', value: "is"},
  {key:'Indonesian',text:'Indonesian', value: "id"},
  {key:'Italian',text:'Italian', value: "it"},
  {key:'Japanese',text:'Japanese', value: "ja"},
  {key:'Kazakh',text:'Kazakh', value: "kk"},
  {key:'Kirghiz',text:'Kirghiz', value: "ky"},
  {key:'Korean',text:'Korean', value: "ko"},
  {key:'Kurdish',text:'Kurdish', value: "ku"},
  {key:'Latvian',text:'Latvian', value: "lv"},
  {key:'Lithuanian',text:'Lithuanian', value: "lt"},
  {key:'Malayalam',text:'Malayalam', value: "ml"},
  {key:'Mongolian',text:'Mongolian', value: "mn"},
  {key:'Norwegia_Bokmal',text:'Norwegia_Bokmal', value: "nb"},
  {key:'Norwegian_Nynorsk',text:'Norwegian_Nynorsk', value: "nn"},
  {key:'Panjabi',text:'Panjabi', value: "pa"},
  {key:'Persian',text:'Persian', value: "fa"},
  {key:'Polish',text:'Polish', value: "pl"},
  {key:'Portuguese',text:'Portuguese', value: "pt"},
  {key:'Pushto',text:'Pushto', value: "ps"},
  {key:'Romanian',text:'Romanian', value: "ro"},
  {key:'Russian',text:'Russian', value: "ru"},
  {key:'Slovakian',text:'Slovakian', value: "sk"},
  {key:'Somali',text:'Somali', value: "so"},
  {key:'Spanish',text:'Spanish', value: "es"},
  {key:'Swedish',text:'Swedish', value: "sv"},
  {key:'Tamil',text:'Tamil', value: "ta"},
  {key:'Telugu',text:'Telugu', value: "te"},
  {key:'Turkish',text:'Turkish', value: "tr"},
  {key:'Ukrainian',text:'Ukrainian', value: "uk"},
  {key:'Urdu',text:'Urdu', value: "ur"},
  {key:'Vietnamese',text:'Vietnamese', value: "vi"}
]

export default class CategoryCreation extends React.Component{
    constructor(){
        super()
        this.state={
            value: "",
            oglanguage: "Select a language",
            tglanguage: "Select a language"
        }
    }
    showUploadWidget=()=> {
    
        window.cloudinary.openUploadWidget({
           cloudName: "translateme",
           uploadPreset: "qks45ycm",
        inlineContainer: "#lewidget",
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
           showCompletedButton: false,
           multiple: true,
           showUploadMoreButton: false,
           defaultSource: "local",
           text: {
            "en": {
                
                "crop": {
                    "title": "Submit"
        
                }
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
    
        handleChangeOglanguage = (e) => {
            this.setState({ oglanguage: e.currentTarget.textContent })}
        handleChangeTglanguage = (e) => {
            this.setState({ tglanguage: e.currentTarget.textContent })}    

    render(){
        
        return(
            <div>
               
                    
                    <Form.Input label='Title' placeholder='Title' />
                    <Dropdown
                        onChange={this.handleChangeOglanguage}
                        button
                        className='icon'
                        floating
                        labeled
                        icon='world'
                        options={languages}
                        search
                        text={this.state.oglanguage}
                    />
                    <Dropdown
                        onChange={this.handleChangeTglanguage}
                        button
                        className='icon'
                        floating
                        labeled
                        icon='world'
                        options={languages}
                        search
                        text={this.state.tglanguage}
                    />
                    <Button circular size='medium' primary icon='plus' onClick={()=>{this.showUploadWidget()}}>Upload files</Button>
                <div id="lewidget">

                </div>
            </div>
        )
    }
}