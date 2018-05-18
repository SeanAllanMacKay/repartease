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
            marginBottom: 5,
            backgroundColor: "#000000"
        };

        const {
            forward,
            togglePulldown
        }=this.props

        //return statement
        return (
            <nav style={headerStyle}>
                <h1
                style={{color: '#ffffff'}}
                onClick={()=>{
                    togglePulldown()
                }}>
                    Repartease
                </h1>
            </nav>
        );
    }
}
