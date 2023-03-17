import React, { Component } from "react";
import { Link } from "react-router-dom";
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

class CreateRoomPage extends Component {
    defaultVotes = 2;
    constructor(props) {
        super(props);
        this.state = {
            canPause: false,
            skipVotes: this.defaultVotes,
        };
    }

    handleVotesChange(e) {
        this.setState({
            skipVotes: e.target.value,
        });
    }
    handeleCanPause(e) {
        this.setState({
            canPause: e.target.value === "true" ? true : false,
        });
    }

    // handeleCreateRoom() {
    //     fetch("http://127.0.0.1:8000/api/create-room", {
    //         method: "post"
    //         body: {

    //         }
    //     })
    // }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align={"center"}>
                    <Typography component="h4" variant="h4">
                        Create Room
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
                            onChange={this.handeleCanPause}
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
                            defaultValue={this.defaultVotes}
                            label="Votes To Skip"
                            variant="standard"
                            id="standard-basic"
                            inputProps={{
                                min: 1,
                            }}
                            onChange={this.handleVotesChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} align={"center"}>
                    <Button color="success" variant="outlined">
                        Create Room
                    </Button>
                </Grid>
                <Grid item xs={12} align={"center"}>
                    <Button variant="outlined" to="/" component={Link}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default CreateRoomPage;
