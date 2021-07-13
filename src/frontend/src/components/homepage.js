import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    sendsData() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken},
            body: JSON.stringify({
                max_time: 600
            }),
        };
        fetch('/api/create-room', requestOptions).then((response) => 
        response.json()
        ).then((data) => console.log(data));
    };

    render() {
        return (
            <div>
                <nav>
                    <Link to="/login" className="login-btn"><button>Login</button></Link>
                </nav>

                <h1 className="title">Online Chess</h1>

                <div className="join-room-div">
                    <h2 className="join-room">Join Room</h2>
                    <div className="input-fields">
                        <input type="number" placeholder="Code"></input>
                        <button type="submit">Enter</button>
                    </div>
                </div>

                <div className="create-room-div">
                    <h2 className="create-room">Create Room</h2>
                    <button onClick={this.sendsData} className="create-room-btn" type="submit">Create</button>
                </div>

            </div >
        );
    }
}