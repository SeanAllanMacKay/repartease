import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router } from "react-router-dom";
import io from "socket.io-client";

import { App } from "./components/App";

class Index extends React.Component {

	render() {
		return(
			<Router>
				<App/>
			</Router>
		)
	}
}
render(<Index/>, window.document.getElementById("app"))