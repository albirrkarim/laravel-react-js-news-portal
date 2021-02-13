import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";

import { str_limit } from "../Utils/Helper";

const useStyles = makeStyles({
    root: {},
    media: {
        height: 80,
    },
});

import { Link } from "react-router-dom";

export default function CardNews({ item, setNewsId }) {
    const classes = useStyles();

    return (
        <Link to={"/news/" + item.news_id}>
            <Card className={classes.root + " mb-3 card-news shadow"}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="p">
                            {str_limit(item.name, 80)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}
