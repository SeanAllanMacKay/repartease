import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

export class StartGame extends React.Component{
	render(){
		const {
				forward,
				startGame
			}=this.props
		let name = ''
		return (
		 	<Root>
		   		<h1>Start Game</h1>
		        <div>
					<Input 
					placeholder='Name...'
					onChange={event => {
						name=event.target.value
						}
					}/>
				</div>
				<div>
					<Button onClick={()=>{
						startGame(name)
						forward(this.props.history, '/waiting-room')
					}}>Start Game</Button>
				</div>
			</Root>
		);
	}
}