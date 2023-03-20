import React from "react";
import { Link } from "react-router-dom";
import { Typography, Grid, Button } from "@mui/material";

function HomePage() {
    return (
        <Grid container spacing={3} className="center">
            <Grid item xs={12} align={"center"}>
                <Typography variant="h3" component="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <Button
                    to="/join"
                    color="success"
                    variant="outlined"
                    component={Link}
                >
                    JOIN A ROOM
                </Button>
                <Button to="/create" variant="outlined" component={Link}>
                    CREATE A ROOM
                </Button>
            </Grid>
        </Grid>
    );
}

export default HomePage;
