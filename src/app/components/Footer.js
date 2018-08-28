//imports
import React from "react";

export class Footer extends React.Component {

    render(){

        const gamecodeStyle = {
            position: 'fixed',
            height: 50,
            width: 100 + '%',
            top: 60,
            textAlign: 'center'
        }

        const {
            gameCode
        }=this.props

        //return statement
        return (
            <div style = {gamecodeStyle}>
                <h2>
                    {gameCode}
                </h2>
            </div>
        );
    }
}
