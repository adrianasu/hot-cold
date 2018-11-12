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
            history: []
        }
    }

    generateFeedback( currentGuess ){
        let highestNumber = Math.max(currentGuess, this.state.number);
        let lowestNumber = Math.min(currentGuess, this.state.number);
       
        if( currentGuess > 100 || currentGuess < 1 ){
            return "The number should be between 1 and 100";
        } else if( this.state.history.includes(currentGuess) ){
            return "You already guessed that number.";
        } else if( (highestNumber - lowestNumber) > 10 ){
            return "Cold";
        } else if( highestNumber === lowestNumber ){
            return "You got it!";
        } else {
            return "Hot";
        }
    }

    generateResults( currentGuess ){
        currentGuess = parseInt(currentGuess, 10);
        let feedback = this.generateFeedback(currentGuess);
        if( feedback === "You already guessed that number." ){
            this.setState({
                feedback
            });
        } else {
            this.setState({
                feedback,
                history: [...this.state.history, currentGuess],
            });
        }
    }

    newGame( event ){
        event.preventDefault();
        this.setState({
            number: Math.floor(Math.random() * 100) + 1,
            feedback: 'Guess a number between 1 and 100',
            history: []
        });
    }

    timesGuessed(){
        let pluralize = this.state.history.length !== 1;
        return (`You've guessed ${this.state.history.length} ${pluralize ? 'times': 'time'}`);
    }

    render(){

        return(
            <div className="board">
                <button onClick={ e => this.newGame(e) }>New Game</button>
                <Info name="feedback" text={ this.state.feedback } />
                <GuessForm onGuess={ currentGuess => this.generateResults(currentGuess) }/>
                <Info name="counter" text={ this.timesGuessed() } />
                <Info name="history" text={ `Guessed numbers: ${[...this.state.history].join(", ")}` } />
            </div>
        );
    }

}