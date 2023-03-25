import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Grid, Button } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

function Room() {
    const [skipVotes, setSkipVotes] = useState(1);
    const [canPause, setCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
    const [song, setSong] = useState({});
    const { roomCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRoomDetails();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentSong();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getCurrentSong = () => {
        fetch(`/spotify/current-song`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }
            })
            .then((data) => {
                setSong(data);
                console.log(data);
            });
    };

    const getRoomDetails = () => {
        fetch(`/api/room?code=${roomCode}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setSkipVotes(data.skip_votes);
                setCanPause(data.can_pause);
                setIsHost(data.is_host);

                if (data.is_host) {
                    authenticateSpotify();
                }
            })
            .catch(() => {
                navigate("/");
            });
    };

    const authenticateSpotify = () => {
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
                setSpotifyAuthenticated(data.status);
                if (!data.status) {
                    fetch("/spotify/auth-url")
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.auth_url);
                        });
                }
            });
    };

    const handeleLeaveRoom = () => {
        fetch(`/api/leave-room`).then((response) => {
            if (response.ok) {
                navigate("/");
            }
        });
    };

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align={"center"}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setShowSettings(true)}
                >
                    Settings
                </Button>
            </Grid>
        );
    };

    const renderSettings = () => {
        return (
            <Grid container spacing={1} alignItems={"center"}>
                <Grid item xs={12} align={"center"}>
                    <CreateRoomPage
                        update={true}
                        skipVotes={skipVotes}
                        canPause={canPause}
                        roomCode={roomCode}
                        closeCallBack={() => {
                            // Update to new data
                            getRoomDetails();
                            setShowSettings(false);
                        }}
                    />
                </Grid>
            </Grid>
        );
    };

    const handeleDeleteRoom = () => {
        fetch(`/api/delete?code=${roomCode}`).then((response) => {
            if (response.ok) {
                navigate("/");
            }
        });
    };

    if (showSettings) {
        return renderSettings();
    }

    return (
        <Grid container spacing={1} className="center">
            <Grid item xs={12} align={"center"}>
                <Typography component="h4" variant="h4">
                    Code:{roomCode}
                </Typography>
            </Grid>
            <MusicPlayer {...song} />
            <Grid item xs={12} align={"center"}>
                <Typography component="p" variant="p">
                    SKIP VOTES: {skipVotes}
                </Typography>
            </Grid>

            {isHost ? renderSettingsButton() : null}

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
