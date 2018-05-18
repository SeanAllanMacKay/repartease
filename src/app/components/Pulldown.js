//imports
import React from "react";
import { Button } from 'semantic-ui-react'
import { Sidebar, Segment, Menu } from 'semantic-ui-react'

export class Pulldown extends React.Component {

    render(){

    	const scoreStyle = {
            color: '#ffffff', 
            display: 'inline-block', 
            paddingLeft: 10, 
            paddingRight: 10,
            paddingTop: 10
        }

        const {
            visible,
            display,
            players
        }=this.props

        //return statement
        return (
        	<div>
	            <Sidebar.Pushable as={Segment}>
	                <Sidebar 
	                as={Menu} 
	                animation='overlay' 
	                direction='top' 
	                visible={visible} 
	                inverted>

	                	{players.map((player, index)=>(
	                        <p
	                        style={scoreStyle}
	                        key={index}>
	                            {player.name}: {player.points}
	                        </p>
	                    ))}
	                </Sidebar>
	                <Sidebar.Pusher>
	                	{display}
	                </Sidebar.Pusher>
	            </Sidebar.Pushable>
            </div>
        );
    }
}
