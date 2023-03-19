import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Typography,
    Grid,
    Button,
    TextField,
    FormControl,
} from "@mui/material";

function JoinRoomPage() {
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handeleJoinRoom = () => {
        console.log(roomCode);
    };

    return (
        <Grid container spacing={1} className="center">
            <Grid item xs={12} align={"center"}>
                <Typography component="h4" variant="h4">
                    Join Room
                </Typography>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <FormControl>
                    <TextField
                        required={true}
                        type="text"
                        label="Room Code"
                        variant="standard"
                        id="standard-basic"
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <Button
                    color="success"
                    variant="outlined"
                    onClick={handeleJoinRoom}
                >
                    Join Room
                </Button>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <Button
                    variant="outlined"
                    onClick={handleGoBack}
                    component={Link}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}

export default JoinRoomPage;
