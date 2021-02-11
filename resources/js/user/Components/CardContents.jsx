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


    const getName = (item)=>{

        return (
            <Typography
                variant="body1"
                component="p"
            >
                {str_limit(item.name, 80)}
            </Typography>
        )
    }

    const getLink = (item)=>{


        if(item.text){
        
            if(validURL(item.text)){
   
                return (
                    <a href={item.text} target="_blank" >
                        {getName(item)}
                    </a>

                )
            }else if (item.text!=null&&item.text!="null"){
  
                return (
                    <Link to={"/dashboard/"+item.contents_id} >
                        {getName(item)}
                    </Link>
                )
            }


        }


        if (item.file && isDocument(item.file)){
            return (
                 <a href={location.origin+"/storage/images/"+item.file} target="_blank" >
                    {getName(item)}
                </a>
            )
        }

        
        return ""
    }

    return (
        <Grid item xs={3}>
            <Card className={classes.root + " mb-3 card-news shadow"}>
              
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
                                {getLink(item)}

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
                
            </Card>
        </Grid>
    );
}
