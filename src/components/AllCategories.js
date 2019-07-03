import React from 'react'
import { Button, Dimmer, Header, Image, Card, Modal } from 'semantic-ui-react'

let languages = {Afrikaans:"af",
    Albanian:"sq",
    Arabic:"ar",
    Armenian:"hy",
    Azerbaijani:"az",
    Bashkir:"ba",
    Basque:"eu",
    Belarusian:"be",
    Bengali:"bn",
    Bosnian:"bs",
    Bulgarian:"bg",
    Central_Khmer:"km",
    Chinese_Simplified:"zh",
    Chinese_Traditional: "TW",
    Chuvash: "cv",
    Czech:"cs",
    Danish:"da",
    Dutch:"nl",
    English:"en",
    Esperanto:"eo",
    Estonian:"et",
    Finnish:"fi",
    French:"fr",
    Georgian:"ka",
    German:"de",
    Greek:"el",
    Gujarati:"gu",
    Haitian:"ht",
    Hebrew:"he",
    Hindi:"hi",
    Hungarian:"hu",
    Icelandic:"is",
    Indonesian:"id",
    Italian:"it",
    Japanese:"ja",
    Kazakh:"kk",
    Kirghiz:"ky",
    Korean:"ko",
    Kurdish:"ku",
    Latvian:"lv",
    Lithuanian:"lt",
    Malayalam:"ml",
    Mongolian:"mn",
    Norwegia_Bokmal:"nb",
    Norwegian_Nynorsk:"nn",
    Panjabi:"pa",
    Persian:"fa",
    Polish:"pl",
    Portuguese:"pt",
    Pushto:"ps",
    Romanian:"ro",
    Russian:"ru",
    Slovakian:"sk",
    Somali:"so",
    Spanish:"es",
    Swedish:"sv",
    Tamil:"ta",
    Telugu:"te",
    Turkish:"tr",
    Ukrainian:"uk",
    Urdu:"ur",
    Vietnamese:"vi"}

export default class AllCategory extends React.Component{
    constructor(){
        super()
        this.state={
            active: false,
            open: false,
            initialLanguage: "",
            categoryId: null

        }
    }
    show = dimmer => (e) => {debugger
        this.setState({ 
            dimmer, open: true,
            categoryId: e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.id
        })}
    close = () => this.setState({ open: false })


    handleDimmer=()=>{
        this.setState({
            active: !this.state.active
        })
    }
    render(){
        const { open, dimmer } = this.state
        const { active } = this.state
        const content = (
            <div>
                <Header as='h2' inverted>
                {this.props.category.title}
                </Header>
                <Header as='h2' inverted>
                {this.props.category.language}
                </Header>
                <Button circular size='huge' onClick={this.show('blurring')} primary icon='plus' />
                <Button circular size='huge' icon='heart outline' />
            </div>
             )





    //   t.string :input
    //   t.string :og_language
    //   t.string :output
    //   t.string :tr_language
    //   t.integer :category_id
    //   t.string :url

    
        return(
            <div>
                <div>
                        <Modal dimmer={dimmer} open={open} onClose={this.close}>
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content image>
                            <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                            <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>We've found the following gravatar image associated with your e-mail address.</p>
                            <p>Is it okay to use this photo?</p>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={this.close}>
                            Nope
                            </Button>
                            <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Create"
                            onClick={this.close}
                            />
                        </Modal.Actions>
                        </Modal>
                    </div>

                <div>
                    <Card id={this.props.category.id} raised className="card" color='red' image={
                    <Dimmer.Dimmable
                        
                        as={Image}
                        dimmed={active}
                        dimmer={{ active, content }}
                        onMouseEnter={this.handleDimmer}
                        onMouseLeave={this.handleDimmer}
                        size='medium'
                        src={this.props.category.url}
                    />
                    } >
                
                    </Card> 
                </div>
        </div>
        )
    }
}