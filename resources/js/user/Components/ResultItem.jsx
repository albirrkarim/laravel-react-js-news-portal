import React, { useState } from "react";
import { IconButton, Typography, Grid } from "@material-ui/core";

import { str_limit,validURL,isDocument,isImageFile } from "../Utils/Helper";

import ShareLink from "./Share/ShareLink";
import { FiShare2, FiX, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { FiLink,FiFileText } from "react-icons/fi";

export default function ResultItem({ item, handleClose }) {
    function makeLink(mode, id) {
        return `/${mode}/${id}`;
    }

    const [openShare, setOpenShare] = useState(false);

    let { name, text, contents_id, news_id } = item;

    let mode = "news";
    let id = news_id;

    if (contents_id) {
        mode = "dashboard";
        id = contents_id;
    }


    let linkCollection = makeLink(mode, id);

    return (
        <Grid container className="shadow mb-5 p-3 rounded card-room">
            <Grid item lg={10} md={10} sm={8} xs={8}>
                {
                    mode=='news' &&
                    <Link to={linkCollection} onClick={handleClose}>
                        <Typography variant="h5" gutterBottom>
                            {name}
                        </Typography>
                    </Link>
                }

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
                    <Link to={linkCollection} onClick={handleClose}>
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

                {text && (
                    <p
                        style={{ opacity: "0.85" }}
                        className="text-justify"
                        dangerouslySetInnerHTML={{
                            __html: str_limit(text, 100),
                        }}
                    ></p>
                )}

                <IconButton
                    size="small"
                    color="primary"
                    aria-label="share"
                    onClick={() => {
                        setOpenShare(!openShare);
                    }}
                >
                    {openShare ? <FiX /> : <FiShare2 />}
                </IconButton>

                {openShare && (
                    <ShareLink
                        link={location.origin + linkCollection}
                        name={name}
                        customOpen={true}
                        setOpenShare={setOpenShare}
                    />
                )}
            </Grid>
            <Grid item lg={2} md={2} sm={4} xs={4} container justify="flex-end">

                {
                    mode == 'news' &&

                    <Link to={linkCollection} onClick={handleClose}>
                        <IconButton size="medium" aria-label="Find out">
                            <FiArrowRight />
                        </IconButton>
                    </Link>
                }
                

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
    );
}
