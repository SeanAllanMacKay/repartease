import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'

export class Home extends React.Component{
	render(){

		const containerStyle = {
			width: 80 + '%',
			marginLeft: 10 + '%',
			marginTop: 40 + '%'
		}

		const buttonStyle = {
			marginTop: 15 + '%',
			marginBottom: 15 + '%'
		}

		const {
			forward
		}=this.props

	    return (
	    	<Root>
		        <div style={containerStyle}>
					<Button 
					fluid
					size = 'massive'
					style={buttonStyle}
					onClick={()=>{forward(this.props.history, '/start-game')}}>
						Start Game
					</Button>

					<Button 
					fluid
					size = 'massive'
					style={buttonStyle}
					onClick={()=>{forward(this.props.history, '/join-game')}}>
						Join Game
					</Button>
				</div>
			</Root>
	    );
	}
}