import React, { useState } from "react";
import clsx from "clsx";

import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
    AppBar,
    Tabs,
    Tab,
    makeStyles
} from "@material-ui/core";


import DeleteButton from "../../components/CardCRUD/DeleteButton";
import ShareLink from "../../components/ShareLink";

import { str_limit, alphaNumeric } from "../../utils/helper";

import FormEdit from "./Partials/FormEdit";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    statsItem: {
        alignItems: "center",
        display: "flex"
    },
    statsIcon: {
        marginRight: theme.spacing(1)
    }
}));

const CardClass = ({ item, refreshData }) => {

    let mode="categories"
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);


    const BASE_URL = location.origin + "/data/categories/" + item.category_id;

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
                        
                        <Typography
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            variant="h4"
                        >
                            {str_limit(item.name)}
                        </Typography>

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
