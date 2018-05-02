//imports
import React from "react";

export class Footer extends React.Component {
    render(){
        //header style
        const footerStyle = {
            flex: 1,
            position:'absolute',
            left:0,
            bottom:0,
            height: 10 + '%',
            width: 99 + '%',
            padding: 5,
            marginBottom: 5,
            backgroundColor: "#000000"
        };

        const {
            players
        }=this.props

        while(players==undefined){
            return (
                <nav style={footerStyle}>
                    <div>
                    </div >
                </nav>
                
            );
        }

        return (
            <nav style={footerStyle}>
                <div style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {players.map((player, index)=>(
                        <p
                        style={{color: '#ffffff'}}
                        key={index}>
                            {player.name}: {player.points}
                        </p>
                    ))}
                </div>
            </nav>
        );
        
    }
}
