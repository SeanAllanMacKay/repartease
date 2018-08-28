import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'

export class Home extends React.Component{
	render(){

		const containerStyle = {
			width: 80 + '%',
			marginLeft: 10 + '%',
			marginTop: 20 + '%'
		}

		const headerStyle = {
			textAlign: 'center',
			fontSize: 55
		}

		const buttonStyle = {
			marginTop: 15 + '%',
			marginBottom: 15 + '%'
		}

		const {
			forward
		}=this.props

	    return (
		        <div style={containerStyle}>
		        	<h1 style={headerStyle}>Home</h1>
					<Button 
					fluid
					size = 'huge'
					style={buttonStyle}
					onClick={()=>{forward(this.props.history, '/start-game')}}>
						Start Game
					</Button>

					<Button 
					fluid
					size = 'huge'
					style={buttonStyle}
					onClick={()=>{forward(this.props.history, '/join-game')}}>
						Join Game
					</Button>
				</div>
	    );
	}
}