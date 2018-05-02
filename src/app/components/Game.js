import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'

export class Game extends React.Component{

	render(){

		const {
			gameCode,
			forward,
			allIn,
			players,
			player,
			turn,
			submit,
			submissions,
			submitted,
			currentSelection,
			select,
			gameNotFound
		}=this.props

		let submission = null

		if(gameNotFound){

			return(
				<Root>
					<h1>Error: Game Not Found</h1>
					<Button onClick={()=>{
	                    forward(this.props.history, '/join-game')
	                }}>Retry</Button>
				</Root>
			)

		}else{

			if(!allIn){
				return (
			    	<Root>
				        <h1>Waiting Room</h1>
				        <h2>{gameCode}</h2>
				        <h3>Players:</h3>
				        {players.map((player, index)=>(
		                    <h4
		                    key={index}>
		                        {player.name}
		                    </h4>
	                    ))}
					</Root>
			    )
			}else if(turn.socket==player.socket){
			    return (
			    	<Root
			    	players={players}>
				        <h1>Your Turn</h1>
				        <h2>{gameCode}</h2>
				        <h2>Prompt goes here</h2>
				        <h3>Submissions:</h3>
				        <Form>
					        {submissions.map((submission, index)=>(
					        	<Form.Field>
						        	<Checkbox
						        	radio
						        	name='checkboxRadioGroup'
						        	key={index}
						        	label={submission}
						        	checked={currentSelection===submission}
						        	onChange={()=>{
						        		select(submission)
						        	}}/>
				                </Form.Field>
		                    ))}
	                    </Form>
	                    <Button onClick={()=>{
	                    	if(currentSelection){
	                    		submit(currentSelection)
	                    	}
	                    }}>Submit</Button>
					</Root>
			    );
			}else if(turn.socket!=player.socket && !submitted){
				return (
			    	<Root
			    	players={players}>
				        <h1>{turn.name}'s Turn</h1>
				        <h2>{gameCode}</h2>
				        <h2>Prompt goes here</h2>
				        <Input 
						placeholder='Answer Here...'
						onChange={event => {
							submission=event.target.value
							}
						}/>
						<Button onClick={()=>{
							submit(submission)
						}}>Submit</Button>
					</Root>
			    );
			}else if(turn.socket!=player.socket && submitted){
				return (
			    	<Root
			    	players={players}>
				        <h1>{turn.name}'s Turn</h1>
				        <h2>{gameCode}</h2>
				        <h2>Prompt goes here</h2>
				        <h2>{submission}</h2>
					</Root>
			    );
			}
		}
	}
}