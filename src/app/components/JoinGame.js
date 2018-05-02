import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

export class JoinGame extends React.Component{
	render(){
		const {
				forward,
				joinGame
			}=this.props

		let name = ''
		let gameCode = ''

	    return (
	    	<Root>
	    		<h1>Join Game</h1>
		        <div>
					<Input 
					placeholder='Name...'
					onChange={event => {
						name=event.target.value
						}
					}/>
				</div>
				<div>
					<Input 
					placeholder='GameCode...'
					onChange={event => {
						gameCode=event.target.value
						}
					}/>
				</div>
				<div>
					<Button onClick={()=>{
						forward(this.props.history, '/game')
						joinGame(name, gameCode)
					}}>Join Game</Button>
				</div>
			</Root>
	    );
	}
}