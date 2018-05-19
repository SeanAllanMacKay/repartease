import React from "react";


import { Header } from "./Header"
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
            players,
            allIn
        }=this.props
        return (
            <div>
                <Header
                forward={forward}
                togglePulldown={this.togglePulldown}
                allIn={allIn}/>
             
                <Pulldown
                visible={this.state.visible}
                display={this.props.children}
                players={players}/>
            </div>
        );
    }
}