import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./login";
import Homepage from "./homepage";
import Board from "./board";


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/"><Homepage /></Route>
                        <Route path="/login" component={Login} />
                        <Route path="/room/:roomCode" component={Board}/>
                    </Switch>
                </Router>
            </div >
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);