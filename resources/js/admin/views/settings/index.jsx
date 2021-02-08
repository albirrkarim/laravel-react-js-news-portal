import React, { useEffect, useState, Fragment } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "../../components/Page";
import Toolbar from "./Toolbar";
import Card from "./Card";
import axios from "axios";
import CardAdd from "./CardAdd";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
    productCard: {
        height: "100%",
    },
}));

export default function Settings() {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refreshData();
    }, [currentPage]);

    const refreshData = () => {
        setIsLoading(true);
        axios
            .get(location.origin + "/data/settings?page=" + currentPage)
            .then((resp) => {
                let { data, last_page, current_page } = resp.data;

                setSettings(data);
                setLastPage(last_page);
                setCurrentPage(current_page);
                setIsLoading(false);
            })
            .catch(function (error) {
                alert(error.message);
            });
    };

    const handleChange = (e, value) => {
        setCurrentPage(value);
    };

    return (
        <Page className={classes.root} title="Settings">
            <Container maxWidth={false}>
                {/* <Toolbar /> */}
                <Box mt={3}>
                    <CardAdd refreshData={refreshData} />
                </Box>

                {!isLoading ? (
                    <Fragment>
                        {settings.length > 0 ? (
                            <Fragment>
                                <Box mt={3}>
                                    <Grid container spacing={3}>
                                        {settings.map((setting, index) => (
                                            <Grid
                                                item
                                                key={index}
                                                lg={4}
                                                md={6}
                                                xs={12}
                                            >
                                                <Card
                                                    className={
                                                        classes.productCard
                                                    }
                                                    setting={setting}
                                                    refreshData={refreshData}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                                <Box
                                    mt={3}
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Pagination
                                        page={currentPage}
                                        onChange={handleChange}
                                        color="primary"
                                        count={lastPage}
                                        size="small"
                                    />
                                </Box>
                            </Fragment>
                        ) : (
                            "Data kosong, silahkan tambah data ..."
                        )}
                    </Fragment>
                ) : (
                    "loading ..."
                )}
            </Container>
        </Page>
    );
}
