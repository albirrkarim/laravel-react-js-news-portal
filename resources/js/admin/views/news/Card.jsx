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
} from "@material-ui/core";

import DeleteButton from "../../components/CardCRUD/DeleteButton";
import { str_limit, alphaNumeric } from "../../utils/helper";


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
    let mode = "news";
    const classes = useStyles();

    const [value, setValue] = useState(0);
   
    const BASE_URL = location.origin + "/data/news/" + item.news_id;

    return (
        <Grid
            item
            lg={ 4}
            md={ 4}
            sm={ 6}
            xs={12}
        >
            <Card
                className={clsx(classes.root) + " p-3"}
            >
                
                    <CardContent className="p-0">
                        {
                            item.file && 
                            <Box display="flex" justifyContent="center" mb={3}>
                                <a 
                                href={location.origin+"/data/editnews/"+item.news_id}>
                                <img
                                    className="rounded w-100 pointer"
                                    style={{ maxHeight: 300 + "px" }}
                                    src={
                                        location.origin +
                                        "/storage/files/" +
                                        item.file
                                    }
                                    alt={item.name}
                                  
                                />
                                </a>
                            </Box>
                        }
                        
                        <Typography
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            variant="h4"
                        >
                            {str_limit(item.name)}
                        </Typography>

                        <div className="p-2">
                            <a 
                                href={location.origin+"/data/editnews/"+item.news_id}>
                                <Button   

                                    size="small"
                                    variant="contained"
                                    className="mr-2"
                                >

                                    Edit
                                </Button>
                            </a>
                            <DeleteButton
                                url={BASE_URL}
                                refreshData={refreshData}
                            />
                        </div>
                    </CardContent>
        
            </Card>
        </Grid>
    );
};

export default CardClass;
