import React from "react";
import { Link, IconButton, Grid } from "@material-ui/core";

export default ({ icon, url, title, onClick = null }) => {
    return (
        <Grid container justify="center" item xs={3} md={3} lg={3}>
            {onClick != null ? (
                <IconButton onClick={onClick} size="medium" aria-label={title}>
                    {icon}
                </IconButton>
            ) : (
                <Link
                    color="textSecondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={url}
                >
                    <IconButton size="medium" aria-label={title}>
                        {icon}
                    </IconButton>
                </Link>
            )}
        </Grid>
    );
};
