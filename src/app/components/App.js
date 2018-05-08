//import dependencies and components
import React from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom"
import { Redirect } from 'react-router'
import io from "socket.io-client";

import { Root } from "./Root"
import { Home } from "./Home";
import { StartGame } from "./StartGame";
import { JoinGame } from "./JoinGame";
import { WaitingRoom } from "./WaitingRoom";
import { Game } from "./Game";
import { ReJoin } from "./ReJoin";

export class App extends React.Component{

	constructor(props) {
		// need to call the parent class beffore anything else
		super(props)
		// initialize state - this should have all the application data
		this.state = {
			//players is a empty array
			currentSession: true,
			players: [],
			gameCode: '',
			player: '',
			turn: null,
			points: 0,
			allIn: false,
			submissions: [],
			submitted: false,
			currentSelection: '',
			submission: '',
			gameNotFound: false
		};
		//bind the functions to the constructor
		this.startGame = this.startGame.bind(this)
		this.joinGame = this.joinGame.bind(this)
		this.allIn = this.allIn.bind(this)
		this.forward = this.forward.bind(this)
		this.submit = this.submit.bind(this)
		this.select = this.select.bind(this)
		this.checkSession = this.checkSession.bind(this)
		this.newSession = this.newSession.bind(this)
	}

	//on componentdidmount
	componentDidMount() {
		//shorthand
		this.socket = io('/game')
		//io events
		this.socket
			//on update player event & set gamecode
			.on('updatePlayers', game =>{
				this.setState({ gameNotFound: false})

				if(this.state.allIn==false){
					this.setState({ turn: game.turn})
				}

				let leaderboard = game.players

				function compareValues(key, order='asc') {
					return function(a, b) {
				    	if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				    	  // property doesn't exist on either object
				    	    return 0; 
				    	}

					    const varA = (typeof a[key] === 'string') ? 
					    	a[key].toUpperCase() : a[key];
					    const varB = (typeof b[key] === 'string') ? 
					    	b[key].toUpperCase() : b[key];

					    let comparison = 0;
					    if (varA > varB) {
					    	comparison = 1;
					    } else if (varA < varB) {
					    	comparison = -1;
					    }
					    return (
					    	(order == 'desc') ? (comparison * -1) : comparison
					    );
					};
				}

				leaderboard.sort(compareValues('points', 'desc'))

				this.setState({ players: leaderboard })

				if(this.state.gameCode != game.code){
					this.setState({ gameCode: game.code })
				}

			})
			.on('setPlayer', player =>{
				this.setState({ player: player })
			})
			.on('gameNotFound', () =>{
				this.setState({ gameNotFound: true })
			})
			.on('allIn', () => {
				this.setState({ allIn: true })
			})
			.on('submission', submission => {
				this.setState({ submissions: [...this.state.submissions, submission]})
			})
			.on('select', submission => {
				if(submission==this.state.submission){
					this.socket.emit('addPoint', this.state.gameCode, this.state.player)
				}
			})
			.on('changeTurn', (newTurn) => {

				this.setState({ 
					submissions: [],
					submitted: false,
					currentSelection: '',
					submission: '',
					allIn: true,
					turn: newTurn
				})
				this.socket.emit
			})
	}

	//on forward
	forward(currentLocation, forwardLocation){
		currentLocation.push(forwardLocation)
	}

	//on start game
	startGame(name){
		this.socket.emit('startGame', name)
	}

	//on join game
	joinGame(name, gameCode){
		this.socket.emit('joinGame', name, gameCode)
		this.setState({ player: name})
	}

	allIn(){
		this.setState({ allIn: true })
		this.socket.emit('allIn', this.state.gameCode)
	}

	submit(submission){
		if(this.state.player.socket!=this.state.turn.socket){
			this.socket.emit('submission', submission, this.state.gameCode)
			this.setState({ submitted: true })
			this.setState({ submission: submission })
		}else if(this.state.player.socket==this.state.turn.socket){
			this.socket.emit('select', submission, this.state.gameCode)
			this.socket.emit('changeTurn', this.state.gameCode)
		}
	}

	select(submission){
		this.setState({ currentSelection: submission })
	}

	checkSession(){
		if (this.state.currentSession){
			return true
		}else{
			return false
		}
	}

	newSession(){
		this.setState({ currentSession: false })
	}

	//render 
	render(){
		//return statement
		return (
			<Root
				forward={this.forward} 
				players={this.state.players}>
				<Switch>
					//at route '/', render home component
					<Route 
					exact path={"/"}
					render = {props=>(
						<Home 
							{...props} 
							forward={this.forward}/>
					)}/>
					//at route '/start-game', render startgame component
					<Route 
					path={"/start-game"}
					render= {props=>(
						<StartGame 
							{...props} 
							forward={this.forward} 
							startGame={this.startGame}
						/>
					)}
					/>
					//at route '/joingame', render joingame component
					<Route 
					path={"/join-game"} 
					render= {props=>(
						this.checkSession() ? (
							<ReJoin 
								{...props} 
								forward={this.forward} 
								joinGame={this.joinGame}
								newSession = {this.newSession}
							/>
							) : (
							<JoinGame 
								{...props} 
								forward={this.forward} 
								joinGame={this.joinGame}
							/>
						)
					)}
					/>
					//at route '/waiting-room', render waitingroom component
					<Route 
					path={"/waiting-room"} 
					render= {props=>(
						<WaitingRoom 
							{...props}
							players={this.state.players} 
							gameCode={this.state.gameCode}
							allIn={this.allIn}
							forward={this.forward}/>
					)}/>
					<Route 
					path={"/game"} 
					render= {props=>(
						<Game
							{...props}
							forward={this.forward}
							players={this.state.players}
							player={this.state.player}
							turn={this.state.turn}
							gameCode={this.state.gameCode}
							allIn={this.state.allIn}
							submit={this.submit}
							submissions={this.state.submissions}
							submitted={this.state.submitted}
							select={this.select}
							currentSelection={this.state.currentSelection}
							gameNotFound={this.state.gameNotFound}/>
					)}/>
				</Switch>
			</Root>
		);
	}
}