//imports
import React from "react";

export class Footer extends React.Component {
    render(){
        //footer style
        const footerStyle = {
            position:'absolute',
            left:0,
            bottom:0,
            height: 50,
            width: 100 + '%',
            padding: 5,
            backgroundColor: "#000000"
        };

        const scoreStyle = {
            color: '#ffffff', 
            display: 'inline-block', 
            paddingLeft: 10, 
            paddingRight: 10,
            paddingTop: 10
        }

        const containerStyle = {
            overflowX: 'scroll', 
            overflowY: 'hidden', 
            whiteSpace: 'nowrap'
        }

        const {
            players
        }=this.props

        while(players==undefined){
            return (
                <nav style={footerStyle}>
                </nav>
                
            );
        }

        return (
            <nav style={footerStyle}>
                <div style={containerStyle}>
                    {players.map((player, index)=>(
                        <p
                        style={scoreStyle}
                        key={index}>
                            {player.name}: {player.points}
                        </p>
                    ))}
                </div>
            </nav>
        );
        
    }
}
