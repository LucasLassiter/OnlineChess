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
        fetch('/api/get-room?code=' + roomCode).then((response) =>
            response.json()
        ).then((data) => {
            setBoardState({
                hostTime: data.host_curr_time,
                guestTime: data.guest_curr_time,
                chessAnnotations: data.chess_annotations,
                isHost: data.is_host,
                fen: data.fen,
            });
        });
    }

    const [boardState, setBoardState] = useState(initialState);

    let game = useRef(null);
    useEffect(() => {
        getRoomDetails();
        game.current = new Chess();
    }, []);

    const onDrop = ({sourceSquare, targetSquare}) => {
        let move = game.current.move({
            from: sourceSquare,
            to: targetSquare
        })

        if(move === null) return; // Here to check for illegal moves

        //provide the fen string
        setBoardState({ ...boardState, fen: game.current.fen()});
        console.log({ ...boardState, fen: game.current.fen()});
        console.log(game.current.fen())
        console.log(boardState.fen);


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({
                fen: boardState.fen,
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