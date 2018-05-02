import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'

export class ReJoin extends React.Component{
	render(){
		const {
			forward,
			newSession
		}=this.props

	    return (
	    	<Root>
		        <div>
					<Button>ReJoin Most Recent Game</Button>
				</div>
				<div>
					<Button onClick={()=>{
						newSession()
						forward(this.props.history, '/join-game')
					}}>Join New Game</Button>
				</div>
			</Root>
	    );
	}
}