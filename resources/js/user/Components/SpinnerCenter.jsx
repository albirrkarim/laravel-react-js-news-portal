import React from "react";

import { CircularProgress, Grid } from "@material-ui/core";

export default function SpinnerCenter() {
    return (
        <Grid container justify="center">
            <CircularProgress color="primary" className="mt-5 mb-5" />
        </Grid>
    );
}
