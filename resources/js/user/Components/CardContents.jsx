import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    IconButton
} from "@material-ui/core";

import { str_limit,validURL,isDocument,isImageFile } from "../Utils/Helper";

const useStyles = makeStyles({
    root: {},
    media: {
        height: 80,
    },
});

import { Link } from "react-router-dom";


import { FiLink,FiFileText } from "react-icons/fi";


export default function CardContents({ item, setNewsId }) {
    const classes = useStyles();

    return (
        <Grid item xs={3}>
            <Card className={classes.root + " mb-3 card-news shadow"}>
                <CardActionArea>
                    {
                        item.file&&isImageFile(item.file) &&
                        <CardMedia
                            className={classes.media}
                            image={
                                location.origin +
                                "/storage/images_thumbnail/" +
                                item.file
                            }
                            title={item.name}
                        />
                    }
                    
                    <CardContent>
                        <Grid container >
                            <Grid item xs={6} >
                                {
                                   (item.text && validURL(item.text)) && (
                                    <a href={item.text} target="_blank" >
                                        <Typography
                                            variant="body1"
                                            component="p"
                                        >
                                            {str_limit(item.name, 80)}
                                        </Typography>
                                    </a>
                                    )
                                }

                                {
                                   (item.text && !validURL(item.text)) && (
                                    <Link to={"/dashboard/"+item.contents_id} >
                                        <Typography
                                            variant="body1"
                                            component="p"
                                        >
                                            {str_limit(item.name, 80)}
                                        </Typography>
                                    </Link>
                                    )
                                }
                                

                                {
                                    (item.file && isDocument(item.file)) && (
                                        <a href={location.origin+"/storage/images/"+item.file} target="_blank" >
                                            <Typography
                                                variant="body1"
                                                component="p"
                                            >
                                                {str_limit(item.name, 80)}
                                            </Typography>
                                        </a>
                                    )
                                }

                            </Grid>
                            <Grid item xs={6} container justify="flex-end">
                                {
                                    (item.text && validURL(item.text)) && (
                                        <a href={item.text} target="_blank" >
                                            <IconButton className="pointer" color="primary" aria-label="link">
                                              <FiLink />
                                            </IconButton>
                                        </a>
                                    )
                                }
                                
                                {
                                    (item.file && isDocument(item.file)) && (
                                        <a href={location.origin+"/storage/images/"+item.file} target="_blank" >
                                            <IconButton className="pointer" color="primary" aria-label="Document">
                                              <FiFileText />
                                            </IconButton>
                                        </a>
                                    )
                                }

                            </Grid>
                        </Grid>

                        
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
