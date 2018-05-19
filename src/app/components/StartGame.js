import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

export class StartGame extends React.Component{
	render(){

		const containerStyle = {
			width: 80 + '%',
			marginLeft: 10 + '%',
			marginTop: 30 + '%'
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
				forward,
				startGame
			}=this.props
		let name = ''
		return (
		 		<div style={containerStyle}>
		 			<h1 style={headerStyle}>Start Game</h1>
					<Input 
					fluid
					size = 'huge'
					style={buttonStyle}
					autoCapitalize = 'characters'
					placeholder='Name...'
					onChange={event => {
						name=event.target.value
						}
					}/>

					<Button 
					fluid
					size = 'huge'
					style={buttonStyle}
					onClick={()=>{
						startGame(name)
						forward(this.props.history, '/waiting-room')
					}}>
						Start Game
					</Button>
				</div>
		);
	}
}