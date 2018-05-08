import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'
import io from "socket.io-client";

export class WaitingRoom extends React.Component {

	render(){
		const {
            players,
            gameCode,
            player,
            turn,
            allIn, 
            forward
        } = this.props

        if(players.length>1){
			return (
			   	<div>
			        <h1>Waiting Room</h1>
			        <h2>{gameCode}</h2>
			        <h3>Players:</h3>
			        {players.map((player, index)=>(
		                <h4
		                key={index}>
		                    {player.name}
		                </h4>
	                ))}
	                <Button
	             	onClick={()=>{
						allIn()
						forward(this.props.history, '/game')
	                }}>All In</Button>
				</div>
			)
		}else{
			return (
			   	<div>
			        <h1>Waiting Room</h1>
			        <h2>{gameCode}</h2>
			        <h3>Players:</h3>
			        {players.map((player, index)=>(
		                <h4
		                key={index}>
		                    {player.name}
		                </h4>
	                ))}
				</div>
			)

		}
	}
}