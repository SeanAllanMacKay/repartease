import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'

export class ReJoin extends React.Component{
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
			newSession
		}=this.props

	    return (
	    	<Root>
		    	<div style={containerStyle}>
			        <div>
						<Button
						fluid
						size = 'huge'
						style={buttonStyle}>
							ReJoin Most Recent Game
						</Button>
					</div>
					<div>
						<Button 
						fluid
						size = 'huge'
						style={buttonStyle}
						onClick={()=>{
							newSession()
							forward(this.props.history, '/join-game')
						}}>
							Join New Game
						</Button>
					</div>
				</div>
			</Root>
	    );
	}
}