import React, { useState } from "react";
import clsx from "clsx";

import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
    makeStyles,
    IconButton,
} from "@material-ui/core";

import DeleteButton from "../../components/CardCRUD/DeleteButton";
import { str_limit, alphaNumeric,validURL,isDocument,isImageFile } from "../../utils/helper";
import FormEdit from "./Partials/FormEdit";

import { FiLink,FiFileText } from "react-icons/fi";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    statsItem: {
        alignItems: "center",
        display: "flex",
    },
    statsIcon: {
        marginRight: theme.spacing(1),
    },
}));

const CardClass = ({ item, refreshData }) => {
    let mode = "contents";
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);

    const BASE_URL = location.origin + "/data/contents/" + item.contents_id;

    return (
        <Grid
            item
            lg={isEditMode ? 12 : 4}
            md={isEditMode ? 12 : 4}
            sm={isEditMode ? 12 : 6}
            xs={12}
        >
            <Card
                className={clsx(classes.root) + " p-3"}
                style={isEditMode ? { border: "5px solid #002984" } : {}}
            >
                {isEditMode ? (
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid
                                item
                                xs
                                className="justify-content-start d-flex"
                            >
                                <h5>Edit </h5>
                            </Grid>
                            <Grid
                                item
                                xs
                                className="justify-content-end d-flex"
                            >
                                <Button
                                    color="secondary"
                                    onClick={() => {
                                        setIsEditMode(false);
                                    }}
                                >
                                    Close
                                </Button>
                            </Grid>
                        </Grid>

                        <FormEdit
                            mode={mode}
                            item={item}
                            setIsEditMode={setIsEditMode}
                            refreshData={refreshData}
                        />
                    </CardContent>
                ) : (
                    <CardContent className="p-0">
                        {
                            item.file&&isImageFile(item.file) &&
                            <Box display="flex" justifyContent="center" mb={3}>
                                <img
                                    className="rounded w-100 pointer"
                                    style={{ maxHeight: 300 + "px" }}
                                    src={
                                        location.origin +
                                        "/storage/images/" +
                                        item.file
                                    }
                                    alt={item.name}
                                    onClick={() => {
                                        setIsEditMode(true);
                                    }}
                                />
                            </Box>
                        }
                        
                        <Grid container >
                            <Grid item xs={6} >
                                <Typography
                                    align="left"
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h4"
                                >
                                    {str_limit(item.name)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} container justify="flex-end" >
                                {
                                    (item.text && validURL(item.text)) && (
                                        <a href={item.text} target="_blank" >
                                            <IconButton className="pointer" color="primary" aria-label="delete">
                                              <FiLink />
                                            </IconButton>
                                        </a>
                                    )
                                }
                                
                                {
                                    (item.file && isDocument(item.file)) && (
                                        <a href={location.origin+"/storage/images/"+item.file} target="_blank" >
                                            <IconButton className="pointer" color="primary" aria-label="delete">
                                              <FiFileText />
                                            </IconButton>
                                        </a>
                                    )
                                }
                                
                            </Grid>
                        </Grid>
                        


                        
                        <div className="p-2">
                            <Button   

                            size="small"
                            variant="contained"
                            className="mr-2"
                            onClick={() => {
                                setIsEditMode(true);
                            }}

                            >

                            Edit
                            </Button>
                            <DeleteButton
                                url={BASE_URL}
                                refreshData={refreshData}
                            />
                        </div>
                    </CardContent>
                )}
            </Card>
        </Grid>
    );
};

export default CardClass;
