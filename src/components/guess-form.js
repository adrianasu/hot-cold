import React from 'react';
import './guess-form.css';

export default class GuessForm extends React.Component {

    onSubmit(e) {
        e.preventDefault();
        const currentGuess = this.textInput.value;
         console.log("VAL ", currentGuess);
       if( currentGuess && this.props.onGuess ) {
           this.props.onGuess(currentGuess);
       }
        this.textInput.value ='';
    }

    render(){
        return(
            <form onSubmit={ e => this.onSubmit(e) }>
                <input 
                    type="number"
                    id="current-guess"
                    name="current-guess"
                    placeholder="Enter your Guess"
                    ref={ input => this.textInput = input}
                />
                <button type="submit">Guess</button>
            </form>
        ); 
        }
}
