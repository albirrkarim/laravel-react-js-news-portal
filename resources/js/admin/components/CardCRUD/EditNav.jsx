import React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Button,
    makeStyles,
    CircularProgress
} from "@material-ui/core";
import ButtonSubmit from "../Button/ButtonSubmit";

export default function EditNav({ isLoading, onCancel }) {
    return (
        <Grid container spacing={3} className="mt-3">
            <Grid item xs={6} container justify="flex-start">
                <Button color="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </Grid>
            <Grid item xs={6} container justify="flex-end">
                <ButtonSubmit isLoading={isLoading} />
            </Grid>
        </Grid>
    );
}
