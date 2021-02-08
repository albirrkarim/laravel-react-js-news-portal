import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from "@material-ui/core";

import { str_limit } from "../Utils/Helper";

const useStyles = makeStyles({
    root: {},
    media: {
        height: 80,
    },
});

import { Link } from "react-router-dom";

export default function MediaCard({ item, setNewsId }) {
    const classes = useStyles();

    return (
        <Grid item xs={3}>
            <Link to={"/dashboard/" + item.contents_id}>
                <Card className={classes.root + " mb-3 card-news shadow"}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={
                                location.origin +
                                "/storage/images_thumbnail/" +
                                item.file
                            }
                            title={item.name}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="p"
                            >
                                {str_limit(item.name, 80)}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    );
}
