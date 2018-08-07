import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

export class JoinGame extends React.Component{
	render(){

		const containerStyle = {
			width: 80 + '%',
			marginLeft: 10 + '%',
			marginTop: 20 + '%'
		}

		const headerStyle = {
			textAlign: 'center',
			fontSize: 60
		}

		const buttonStyle = {
			marginTop: 15 + '%',
			marginBottom: 15 + '%'
		}

		const {
				forward,
				joinGame
			}=this.props

		let name = ''
		let gameCode = ''

	    return (
		    	<div style={containerStyle}>
		    		<h1 style={headerStyle}>Join Game</h1>
					
					<Input 
					fluid
					size = 'huge'
					style={buttonStyle}
					placeholder='Name...'
					onChange={event => {
						name=event.target.value
						}
					}/>
					
					<Input 
					fluid
					size = 'huge'
					style={buttonStyle}
					placeholder='GameCode...'
					autoCapitalize = 'characters'
					onChange={event => {
						gameCode=event.target.value
						}
					}/>
					
					<Button 
					fluid
					size = 'huge'
					style={buttonStyle}
					onClick={()=>{
						forward(this.props.history, '/game')
						joinGame(name, gameCode)
					}}>
						Join Game
					</Button>
				</div>
	    );
	}
}