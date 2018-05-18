import React from "react";


import { Header } from "./Header";
import { Footer } from "./Footer"
import { Pulldown } from "./Pulldown"



export class Root extends React.Component {

    constructor(props) {
        // need to call the parent class beffore anything else
        super(props)
        // initialize state - this should have all the application data
        this.state = {
            visible: false
        };
        this.togglePulldown = this.togglePulldown.bind(this)
    }

    togglePulldown(){
        this.setState({visible: !this.state.visible})
    }

    render(){
        const {
            forward,
            players
        }=this.props
        return (
            <div>
                <Header
                forward={forward}
                togglePulldown={this.togglePulldown}/>
             
                <Pulldown
                visible={this.state.visible}
                display={this.props.children}
                players={players}/>
            </div>
        );
    }
}