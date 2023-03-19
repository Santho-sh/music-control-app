import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Room(props) {
    const [skipVotes, setSkipVotes] = useState(1);
    const [canPause, setCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const { roomCode } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/room?code=${roomCode}`)
        .then((response) => response.json())
        .then((data) =>{
            setSkipVotes(data.skip_votes);
            setCanPause(data.can_pause);
            setIsHost(data.is_host)
        })
    });

    return (
        <div className="center">
            <h4>Code:{roomCode}</h4>
            <p>{skipVotes}</p>
            <p>{canPause? 'true':'false'}</p>
            <p>{isHost? 'true':'false'}</p>
        </div>
    );
}

export default Room;
