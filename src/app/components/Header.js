//imports
import React from "react";

export class Header extends React.Component {
    render(){
        const headerStyle = {
            textAlign: 'center',
            height: 20 + '%',
            width: 99 + '%',
            padding: 5,
            marginBottom: 5,
            backgroundColor: "#000000"
        };

        //return statement
        return (
            <nav style={headerStyle}>
                <div>
                    <h1 style={{color: '#ffffff'}}>Repartease</h1>
                </div >
            </nav>
        );
    }
}
