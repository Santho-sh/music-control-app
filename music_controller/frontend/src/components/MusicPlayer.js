import React from "react";
import {
    Typography,
    Grid,
    Card,
    IconButton,
    LinearProgress,
} from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import Pause from "@mui/icons-material/Pause";

// You Can Only Pause/Play/Skip If You have - "Spotify Premium"
function MusicPlayer(props) {
    const pauseSong = () => {
        fetch("/spotify/pause", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
    const playSong = () => {
        fetch("/spotify/play", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const skipSong = () => {
        fetch("/spotify/skip", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <Card className="music-player">
            <Grid container alignItems={"center"}>
                <Grid item xs={4} align={"center"}>
                    <img src={props.img_url} height={"100%"} width={"100%"} />
                </Grid>
                <Grid item xs={8} align={"center"}>
                    <Typography component={"h5"} variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color={"textSecondary"} variant="subtitle1">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton
                            onClick={() => {
                                props.is_playing ? pauseSong() : playSong();
                            }}
                        >
                            {props.is_playing ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton onClick={() => skipSong()}>
                            <SkipNext />
                            {!props.isHost ? (
                                <p>
                                    {props.votes} / {props.skip_votes}
                                </p>
                            ) : null}
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress
                variant="determinate"
                value={(props.time / props.duration) * 100}
            ></LinearProgress>
        </Card>
    );
}

export default MusicPlayer;
