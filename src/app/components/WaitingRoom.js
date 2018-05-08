import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'
import io from "socket.io-client";

export class WaitingRoom extends React.Component {

	render(){

		const containerStyle = {
			textAlign: 'center',
			width: 80 + '%',
			marginLeft: 10 + '%',
			marginTop: 20 + '%'
		}

		const header1Style = {
			fontSize: 45
		}

		const header2Style = {
			fontSize: 25
		}

		const playersContainerStyle = {
			textAlign: 'center',
			maxHeight: 160,
			overflowX: 'hidden', 
            overflowY: 'scroll'
		}

		const buttonStyle = {
			marginTop: 15 + '%',
			marginBottom: 15 + '%'
		}

		const {
            players,
            gameCode,
            player,
            turn,
            allIn, 
            forward
        } = this.props

			return (
			   	<div style={containerStyle}>
			        <h1 
			        style={header1Style}>
			        	Waiting Room
			        </h1>

			        <h2 
			        style={header2Style}>
			        	Game Code: {gameCode}
			        </h2>
			        <h3>
				       	Players:
				    </h3>
			        <div style={playersContainerStyle}>
				        {players.map((player, index)=>(
			                <h4
			                key={index}>
			                    {player.name}
			                </h4>
		                ))}
		            </div>
	                <Button
	                fluid
					size = 'huge'
	                style={buttonStyle}
	             	onClick={()=>{
						allIn()
						forward(this.props.history, '/game')
	                }}>
	                	All In
	                </Button>
				</div>
			)
		}
	}
