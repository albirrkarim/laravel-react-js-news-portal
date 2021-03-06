import React, { useEffect, useState, Fragment } from "react";
import { Box, Container, Grid, makeStyles,Button } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "../../components/Page";
import Card from "./Card";
import axios from "axios";
// import CardAdd from "./CardAdd";

import Search from "../../components/Search";
import SpinnerCenter from "../../components/SpinnerCenter";
import Placeholder from "../../components/Placeholder";

import ControlPointIcon from "@material-ui/icons/ControlPoint";

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

export default function News() {
    const classes = useStyles();

    let mode = "news";

    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchText,setSearchText] = useState("");

    useEffect(() => {
        refreshData();
    }, [currentPage, mode,searchText]);

    const refreshData = () => {
        if(searchText.length>2){
            setIsLoading(true);
            axios
                .get(`${location.origin}/data/search/news/${searchText}`)
                .then((resp) => {
                    setItems(resp.data);
                
                    setIsLoading(false);
                })
                .catch(function (error) {
                    setIsLoading(false);
                    alert(error.message);
                });
        }else{
            setIsLoading(true);
            axios
                .get(`${location.origin}/data/news?page=${currentPage}`)
                .then((resp) => {
                    let { data, last_page, current_page } = resp.data;

                    setItems(data);
                    setLastPage(last_page);
                    setCurrentPage(current_page);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    setIsLoading(false);
                    alert(error.message);
                });

        }
    };

    const handleChange = (e, value) => {
        setCurrentPage(value);
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Page className={classes.root} title={mode}>
            <Container maxWidth={false}>
                {/* <Toolbar /> */}

                <h1>{capitalizeFirstLetter(mode)}</h1>

                <Box mt={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                             <a 
                                href={location.origin+"/data/createnews"}>
                                     <Button
                                        variant="contained"
                                        color="primary"
                                       
                                        className={classes.button}
                                        startIcon={<ControlPointIcon />}
                                    >
                                        Create
                                    </Button>
                            </a>
                        </Grid>
                        <Grid item xs={4}>
                            <Search setSearch={setSearchText} isLoading={isLoading} setIsLoading={setIsLoading} />
                        </Grid>
                        <Grid item xs={4}>
                            <p className="m-0 font-weight-bold">Panduan:</p>
                            <p className="m-0">
                                Klik pada gambar untuk mengedit data
                            </p>
                        </Grid>
                    </Grid>
                </Box>

                {!isLoading ? (
                    <Fragment>
                        {items.length > 0 ? (
                            <Fragment>
                                <Box mt={3}>
                                    <Grid container spacing={3}>
                                        {items.map((item, index) => (
                                            <Card
                                                className={classes.productCard}
                                                key={index}
                                                item={item}
                                                refreshData={refreshData}
                                            />
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
                            <Placeholder/>
                        )}
                    </Fragment>
                ) : (
                    <SpinnerCenter />
                )}
            </Container>
        </Page>
    );
}
