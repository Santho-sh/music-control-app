import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Grid, Button } from "@mui/material";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/user-room")
            .then((response) => response.json())
            .then((data) => {
                if (data.code) {
                    navigate(`/room/${data.code}`);
                }
            });
    }, []);

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
