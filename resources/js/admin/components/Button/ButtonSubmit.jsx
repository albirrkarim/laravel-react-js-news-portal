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

import SaveIcon from '@material-ui/icons/Save';

export default function ButtonSubmit( {isLoading }) {
    return (
        <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            color="primary"
            startIcon={ isLoading ?  (<CircularProgress size={20} color="inherit" />)  :  <SaveIcon />}
        > 
            {
                isLoading ? "Saving ...": "Save"
            }
        </Button>
    );
}
