//imports
import React from "react";
import { Button } from 'semantic-ui-react'
import { Sidebar, Segment, Menu } from 'semantic-ui-react'

export class Header extends React.Component {

    render(){
        const headerStyle = {
            textAlign: 'center',
            height: 50,
            width: 100 + '%',
            padding: 5,
            backgroundColor: "#000000"
        };

        const textStyle = {
            color: '#ffffff'
        };

        const gamecodeStyle = {
            position: 'fixed',
            height: 50,
            width: 100 + '%',
            bottom: 0,
            textAlign: 'center'
        }

        const {
            forward,
            togglePulldown, 
            allIn,
            gameCode
        }=this.props

        //return statement
        return (
            <div>
                <div style={headerStyle}>
                    <h1
                    style={textStyle}
                    onClick={()=>{ 
                        if(allIn){
                            togglePulldown()
                        }
                    }}>
                        Repartease 
                    </h1>
                </div>
            </div>
        );
    }
}
