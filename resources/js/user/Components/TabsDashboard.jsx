import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Tab, Tabs, AppBar } from "@material-ui/core";
import axios from "axios";

import Contents from "./Contents";

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonAuto() {
    const [value, setValue] = useState(0);
    const [category_id, setCategoryId] = useState(0);
    const [categories, setCategories] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios.get(location.origin + "/api/categories").then((resp) => {
            let arr = resp.data;
            setCategories(arr);

            if (arr.length > 0) {
                setCategoryId(arr[0].category_id);
            }
        });
    }, []);

    return (
        <Grid container justify="center">
            <Grid item lg={10} md={10} sm={12} xs={12}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {categories.map((item, idx) => (
                            <Tab
                                key={idx}
                                label={item.name}
                                onClick={() => {
                                    setCategoryId(item.category_id);
                                }}
                                {...a11yProps(idx)}
                            />
                        ))}
                    </Tabs>
                </AppBar>
                <Contents category_id={category_id} />
            </Grid>
        </Grid>
    );
}
