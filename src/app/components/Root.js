import React from "react";


import { Header } from "./Header";
import { Footer } from "./Footer"



export class Root extends React.Component {
    render(){
        const {
            forward,
            players
        }=this.props
        return (
            <div>
                <Header
                forward={forward}/>
             
                <div>
                    {this.props.children}
                </div>

                <Footer
                players={players}/>
            </div>
        );
    }
}