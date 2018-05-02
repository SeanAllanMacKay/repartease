import React from "react";


import { Header } from "./Header";
import { Footer } from "./Footer"



export class Root extends React.Component {
    render(){
        const {
            players
        }=this.props
        return (
            <div>
                <div>
                    <Header/>
                </div>
             
                <div>
                    {this.props.children}
                </div>

                <Footer
                players={players}/>
            </div>
        );
    }
}