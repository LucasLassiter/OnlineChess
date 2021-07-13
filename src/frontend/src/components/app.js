import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./login";
import Homepage from "./homepage";


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
                    </Switch>
                </Router>
            </div >
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);