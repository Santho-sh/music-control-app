import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Grid, Button } from "@mui/material";

function Room() {
    const [skipVotes, setSkipVotes] = useState(1);
    const [canPause, setCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const { roomCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/room?code=${roomCode}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                setSkipVotes(data.skip_votes);
                setCanPause(data.can_pause);
                setIsHost(data.is_host);
            })
            .catch(() => {
                navigate("/");
            });
    }, []);

    const handeleLeaveRoom = () => {
        fetch(`/api/leave-room`).then((response) => {
            if (response.ok) {
                navigate("/");
            }
        });
    };

    const handeleSkipVote = () => {};

    const handeleDeleteRoom = () => {
        fetch(`/api/delete?code=${roomCode}`).then((response) => {
            if (response.ok) {
                navigate("/");
            }
        });
    };

    const handelePause = () => {};

    return (
        <Grid container spacing={1} className="center">
            <Grid item xs={12} align={"center"}>
                <Typography component="h4" variant="h4">
                    Code:{roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <Typography component="p" variant="p">
                    {isHost ? "Your Room" : "Joined Room"}
                </Typography>
            </Grid>

            <Grid item xs={12} align={"center"}>
                <Button variant="outlined" color="error" onClick={handelePause}>
                    {isHost ? "PAUSE" : "NONE"}
                </Button>
            </Grid>

            <Grid item xs={12} align={"center"}>
                <Typography component="p" variant="p">
                    SKIP VOTES: {skipVotes}
                </Typography>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <Button variant="outlined" onClick={handeleSkipVote}>
                    VOTE TO SKIP
                </Button>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={isHost ? handeleDeleteRoom : handeleLeaveRoom}
                >
                    {isHost ? "DELETE ROOM" : "LEAVE ROOM"}
                </Button>
            </Grid>
        </Grid>
    );
}

export default Room;
