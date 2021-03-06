//initialize variables
var path = require('path'),
	express = require('express'),
	http = require('http'),
	socket = require('socket.io'),
	mongoose = require('mongoose')

//simplify to shorthand
var DIST_DIR = path.join(__dirname, 'dist'),
	app = express(),
	server = http.createServer(app),
	io = socket(server)
	game = io.of('/game')
//initialize port to environment vaiable, or default 8080
const PORT = process.env.PORT || 8080

//initialize environment variables
const {
	db_user,
	db_password,
	db_url,
	db_schema
} = process.env

//connect to Database
mongoose.connect(`mongodb://${db_user}:${db_password}@${db_url}/${db_schema}`)

//shorthand
const db = mongoose.connection

//database events
db
	//on error
	.on('error', err => console.log(err))
	//once connected
	.once('open', ()=>{
		//notify you've connected
		console.log('Database Connected!')
		//start server
		server.listen( PORT , function (error){
			//if there is an error
			if(error){
				console.log(error)
			}
			//notify you've connected to the server
			else{
				console.log('Server online: connected to port ' +PORT)
			}
		})
	})

//express will read from the "DIST_DIR" folder"
app.use(express.static(DIST_DIR));

//serve this
app.get('*', function(req, res) {
	res.sendFile(path.join(DIST_DIR, "index.html"));
});

//set up mongoose schemas
var Schema = mongoose.Schema

//schemas for games
var gameSchema = new Schema({
	code: String,
	players: [{name: String, points: String, socket: String}],
	sockets: [String],
	turn: {name: String, points: String, socket: String},
	used: [String]
}, {collection: 'games'})

//schemas for prompts
var promptSchema = new Schema({
	expansion: String,
	prompt: String
}, {collection: 'prompts'})

//shorthand
var Game = mongoose.model('Game', gameSchema)

//shorthand
var Prompts = mongoose.model('Prompts', promptSchema)

//io events
game
//on conection
.on('connection', socket => {
	//io events
	socket
		//on startGame event
		.on('startGame', name => {
			//function to create random code
			function makeCode() {
				var text = "";
			  	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

			  	for (var i = 0; i < 6; i++)
			    text += possible.charAt(Math.floor(Math.random() * possible.length));
			  	return text;
			}

			//set gamecode
			const gameCode = makeCode()

			//create gamecode room, and join it
			socket.join(gameCode)
			//create player object
			let player = { name: name, points: 0, socket: socket.id}
			//create game
			let game = {
				code: gameCode,
				players: [player],
				sockets: [socket.id],
				turn: player,
				used: []
			}
			// create mongoose object newgame
			let newGame =  new Game(game)
			//save the game object
			newGame.save()

			Prompts.find({ 'expansion': 'standard' }, function(err, prompts) {
				// if error
				if (err) {
					console.log(err)
				}
				//if no error
				else{
					socket.emit('initPrompts', prompts)
					socket.emit('updatePlayers', newGame)
					socket.emit('setPlayer', player)
				}
			})
		})
		//on joingame event
		.on('joinGame', (name, gameCode) => {
			//find the corresponding game
			Game.findOne({ 'code': gameCode }, function(err, doc) {
				// if error
				if (err) {
					console.log(err)
				}
				//if no error
				else if (doc) {
					//join game room
					socket.join(gameCode)
					//create player object
					let player = { name: name, points: 0, socket:socket.id}
					//add player
					doc.players = [...doc.players, player];
					//add socket
					doc.sockets = [...doc.sockets, socket.id];
					//save game
					doc.save()

					Prompts.find({ 'expansion': 'standard' }, function(err, prompts) {
						// if error
						if (err) {
							console.log(err)
						}
						//if no error
						else{
							socket.emit('initPrompts', prompts)
							//emit update player event
							socket.emit('updatePlayers', doc, name)
							socket.to(gameCode).emit('updatePlayers', doc);
							socket.emit('setPlayer', player)
						}
					})
				}else{
					socket.emit('gameNotFound')
				}
			})		
		})
		//on allIn event
		.on('allIn', gameCode => {
			socket.to(gameCode).emit('allIn');
		})
		//on submission event
		.on('submission', (submission, gameCode) => {
			socket.to(gameCode).emit('submission', submission);
		})
		//on select event
		.on('select', (submission, gameCode) => {
			socket.to(gameCode).emit('select', submission)
		})
		//on addPoint event
		.on('addPoint', (gameCode, player) => {
			Game.findOne({ 'code': gameCode }, function(err, doc) {
				// if error
				if (err) {
					console.log(err)
				}
				//if no error
				else if (doc){
					let players = doc.players
					for(var i=0; i<players.length; i++){
						if(players[i].socket==socket.id){
							players[i].points++
							doc.save()
							break
						}
					}
					socket.emit('updatePlayers', doc)
					socket.to(gameCode).emit('updatePlayers', doc);
				}
			})
		})
		//on changeTurn event
		.on('changeTurn', (gameCode) => {
			Game.findOne({ 'code': gameCode }, function(err, doc) {
				// if error
				if (err) {
					console.log(err)
				}
				//if no error
				else if (doc){
					var players = doc.players,
						currentTurn = players.find(function(player) {return player.socket==doc.turn.socket})

					if(players.indexOf(currentTurn)+1 < players.length){
						doc.turn = players[(players.indexOf(currentTurn))+1]
						doc.save()
					}else{
						doc.turn = players[0]
						doc.save()
					}
					socket.to(gameCode).emit('changeTurn', doc.turn)
					socket.emit('changeTurn', doc.turn)
				}
			})
		})
		.on('newPrompt', (data) => {
			let length = data.length
			let gameCode = data.gameCode
			Game.findOne({ 'code': gameCode }, function(err, doc) {
				// if error
				if (err) {
					console.log(err)
				}
				//if no error
				else if (doc){
					var used = doc.used
					let array = []

					for(let i = 0; i<length; i++){
						array.push(i)
					}

					for(let i = 0; i<used.length; i++){
						console.log(used[i])
						array.splice(array.indexOf(parseInt(used[i])), 1)
					}

					let location = array[Math.floor(Math.random() * array.length)]
					doc.used.push(location)
					if(doc.used.length>=length){
						doc.used = []
					}
					doc.save()

					socket.to(gameCode).emit('newPrompt', location)
					socket.emit('newPrompt', location)
				}
			})
		})
		.on('disconnect', () => {
			Game.findOne({ sockets: socket.id }, function(err, doc) {
				// if error
				if (err) {
					console.log(err)
				}
				//if no error
				else if (doc){
					let players = doc.players,
						sockets = doc.sockets
					sockets.splice(sockets.indexOf(socket.id), 1)
					doc.sockets = sockets
					doc.save()
					for(var i=0; i<players.length; i++){
						if(players[i].socket==socket.id){
							players.splice(i, 1)
							doc.players = players
							doc.save()
							if(doc.players.length == 0 ){
								Game.remove({ _id: doc._id }, function(err){
									if(err){
										console.log(err)
									}
								})
							}else{
								socket.emit('updatePlayers', doc)
								socket.to(doc.code).emit('updatePlayers', doc)
							}
							break
						}
					}
				}
			})
		})
})