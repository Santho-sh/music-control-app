import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Typography,
    Grid,
    Button,
    TextField,
    Radio,
    FormControl,
    FormHelperText,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";

function CreateRoomPage(props) {

    const [canPause, setCanPause] = useState(props.canPause);
    const [skipVotes, setSkipVotes] = useState(props.skipVotes);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handeleCreateRoom = () => {
        fetch("/api/create", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                can_pause: canPause,
                skip_votes: skipVotes,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                navigate(`/room/${data.code}`);
            });
    };

    const renderCreateRoom = () => {
        return (
            <Grid container spacing={1}>
                <Grid item mt={3} xs={12} align={"center"}>
                    <Button
                        color="success"
                        variant="outlined"
                        onClick={handeleCreateRoom}
                    >
                        Create Room
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
    };

    const renderSaveRoom = () => {
        return (
            <Grid container spacing={1}>
                <Grid mt={3} item xs={12} align={"center"}>
                    <Button
                        color="success"
                        variant="outlined"
                        onClick={props.updateCallBack}
                    >
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12} align={"center"}>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={props.closeCallBack}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container spacing={1} className="center">
            <Grid item xs={12} align={"center"}>
                <Typography component="h4" variant="h4">
                    {props.update ? "Update Room" : "Create Room"}
                </Typography>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <FormControl component="fieldset">
                    <FormHelperText>
                        <span>Guest Control of Playback State</span>
                    </FormHelperText>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="true"
                        name="radio-buttons-group"
                        onChange={(e) =>
                            setCanPause(
                                e.target.value === "true" ? true : false
                            )
                        }
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="success" />}
                            label="Play/Pause"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="default" />}
                            label="No Control"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <FormControl>
                    <TextField
                        required={true}
                        type="number"
                        defaultValue={skipVotes}
                        label="Votes To Skip"
                        variant="standard"
                        id="standard-basic"
                        inputProps={{
                            min: 1,
                        }}
                        onChange={(e) => setSkipVotes(e.target.value)}
                    />
                </FormControl>
            </Grid>
            {props.update ? renderSaveRoom() : renderCreateRoom()}
        </Grid>
    );
}

CreateRoomPage.defaultProps = {
    update: false,
    skipVotes: 2,
    canPause: false,
    roomCode: null,
    updateCallback: () => {},
    closeCallback: () => {},
};

export default CreateRoomPage;
