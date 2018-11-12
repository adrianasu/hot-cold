import React from 'react';
import GuessForm from './guess-form';
import Info from './info';
import './board.css';

export default class Board extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            number: Math.floor(Math.random()*100)+1,
            feedback: 'Guess a number between 1 and 100',
            currentGuess: '',
            history: []
        }
    }

    generateFeedback() {
        let highestNumber = Math.max(this.state.currentGuess, this.state.number);
        let lowestNumber = Math.min(this.state.currentGuess, this.state.number);
        console.log("HIGH ", highestNumber, " LOW ", lowestNumber);
        if( this.state.currentGuess > 100 || this.state.currentGuess < 1) {
            return "The number should be between 1 and 100";
        }
        else if( this.state.currentGuess in this.state.history ){
            return "You already guessed that number.";
        } else if( (highestNumber - lowestNumber) > 10 ){
            return "Cold";
        } else if( highestNumber === lowestNumber) {
            return "You got it!";
        } else {
            return "Hot";
        }
        
    }

    componentDidUpdate( prevProps, prevState ){
        if( prevState.currentGuess !== this.state.currentGuess ) {
            let feedback = this.generateFeedback();
            if ( feedback  === "You already guessed that number." ){
                this.setState({ feedback });
            } else {
                this.setState({
                    feedback,
                    history: [...this.state.history, this.state.currentGuess],
                });
            }   
        }
    }

    newGame(event) {
        event.preventDefault();
        this.setState({
            number: Math.floor(Math.random() * 100) + 1,
            feedback: 'Guess a number between 1 and 100',
            history: []
        });
    }

    render(){

        return(
            <div className="board">
                <button onClick={ e => this.newGame(e) }>New Game</button>
                <Info name="feedback" text={ this.state.feedback } />
                <GuessForm onGuess={ currentGuess => this.setState({ currentGuess })}/>
                <Info name="counter" text={ `You've guessed ${this.state.history.length} times` } />
                <Info name="history" text={ `Guessed numbers: ${[...this.state.history].join(", ")}` } />
            </div>
        );
    }

}