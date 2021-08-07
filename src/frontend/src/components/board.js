import React, { Component, useState, useEffect, useRef } from 'react'
import ChessBoard from "chessboardjsx"
import Chess from "chess.js"

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

console.log(window.location);
var loc = window.location
var wsStart = 'ws://';
if (loc.protocol == 'https:')
{
    wsStart = 'wss://'
}
var endpoint = wsStart + loc.host + loc.pathname;
console.log(endpoint);

var socket = new WebSocket(endpoint);

socket.onmessage = (e) => {
    console.log("message", e);
}

socket.onopen = (e) => {
    console.log("message", e);
}

socket.onerror = (e) => {
    console.log("message", e);
}

socket.onclose = (e) => {
    console.log("message", e);
}


var csrftoken = getCookie('csrftoken');


export default function Board (props) {
    
    const roomCode = props.match.params.roomCode;
    

    const initialState = {
        hostTime: 600,
        guestTime: 600,
        chessAnnotations: "",
        isHost: true,
        fen: "start",
    }

    const getRoomDetails = () => {
        return fetch('/api/get-room?code=' + roomCode).then((response) =>
            response.json()
        ).then((data) => {
            const newObj = {
                hostTime: data.host_curr_time,
                guestTime: data.guest_curr_time,
                chessAnnotations: data.chess_annotations,
                isHost: true,
                fen: data.fen,
            };
            setBoardState(newObj);
            console.log(newObj)
            console.log(boardState.fen + "!!!!!")
        });
    }

    const [boardState, setBoardState] = useState(initialState);
    

    useEffect(() =>
    {
        getRoomDetails()
    }, []);
    

    let game = useRef(null);
    useEffect(() => { 
            console.log(boardState.fen + "lit");
            if (boardState.fen == "start")
            {
                console.log("first if state");
                game.current = new Chess();
            }
            else
            {
                console.log("second if state");
                game.current = new Chess(boardState.fen);
            }
    });



    const onDrop = ({sourceSquare, targetSquare}) => {
        let move = game.current.move({
            from: sourceSquare,
            to: targetSquare
        })

        if(move === null) return; // Here to check for illegal moves

        //provide the fen string
        setBoardState({ ...boardState, fen: game.current.fen()});

        const currentFen = game.current.fen();


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({
                fen: currentFen,
                code: roomCode.toString()
            }),
        };

        fetch('/api/update-fen', requestOptions).then((response) =>
            response.json()
        ).then((data) => console.log(data));

    }

    return (
        <>
        <h1>{roomCode}</h1>
        <p>hostTime {boardState.hostTime}</p>
        <p>Host: {boardState.isHost.toString()}</p>
        <p>Fen: {boardState.fen}</p>
        <div className="chessboard-container"> 
            <ChessBoard onDrop={onDrop} position={boardState.fen}/>
        </div>
        </>
    );

}