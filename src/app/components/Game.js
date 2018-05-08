import React from "react";
import { Root } from './Root'
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'

export class Game extends React.Component{

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
			maxHeight: 200,
			overflowX: 'hidden', 
            overflowY: 'scroll'
		}

		const buttonStyle = {
			marginTop: 15 + '%',
			marginBottom: 15 + '%'
		}

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
				<div>
					<h1>Error: Game Not Found</h1>
					<Button onClick={()=>{
	                    forward(this.props.history, '/join-game')
	                }}>
	                	Retry
	                </Button>
				</div>
			)

		}else{

			if(!allIn){
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
				</div>
			    )
			}else if(turn.socket==player.socket){
			    return (
			    	<div>
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
					</div>
			    );
			}else if(turn.socket!=player.socket && !submitted){
				return (
			    	<div>
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
					</div>
			    );
			}else if(turn.socket!=player.socket && submitted){
				return (
			    	<div>
				        <h1>{turn.name}'s Turn</h1>
				        <h2>{gameCode}</h2>
				        <h2>Prompt goes here</h2>
				        <h2>{submission}</h2>
					</div>
			    );
			}
		}
	}
}