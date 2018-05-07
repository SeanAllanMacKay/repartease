import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'

export class Home extends React.Component{
	render(){
		const {
			forward
		}=this.props

	    return (
	    	<Root>
		        <div>
					<Button 
					onClick={()=>{forward(this.props.history, '/start-game')}}>
						Start Game
					</Button>
				</div>
				<div>
					<Button 
					onClick={()=>{forward(this.props.history, '/join-game')}}>
						Join Game
					</Button>
				</div>
			</Root>
	    );
	}
}