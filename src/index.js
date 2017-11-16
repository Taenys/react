//import des différents composant de l'app
import React from 'react';
import { render } from 'react-dom';
//CSS
import './style/css/bootstrap.min.css';
import './index.css';

//JS perso
import { sampleText} from "./sampleText.js";

//marked.js
import marked from 'marked';


class App extends React.Component{

    state = {
        text: sampleText
    };

    //permet de récupérer ce qui a été mis en local storage
    componentWillMount(){
        const text = localStorage.getItem('text');

        if (text){
            this.setState({ text });
        }
    }

    //créer la mise a jour du component, créer le local storage
    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('text', nextState.text);
    }

    //fonction perso
    editText = (event) => {
        const text = event.target.value;
        this.setState({ text });
    };

    renderText = (text) =>{
        const renderText = marked(text, {sanitize: true});
        return { __html: renderText };
    };

    //rendu de l'app
    render() {
        return(
            <div className="container">
                <div className="row">

                    <div className="col-sm-6">
                        <textarea
                            value={this.state.text}
                            rows="35"
                            className="form-control"
                            onChange={(e) =>this.editText(e)}
                        >

                        </textarea>
                    </div>

                    <div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>

                </div>
            </div>
        )
    }
}

render(
    <App/>,
    document.getElementById('root')
);