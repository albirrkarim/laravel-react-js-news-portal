import React, {
    Suspense,
    lazy,
    useEffect,
    useState,
    useContext,
    Fragment,
} from "react";

import { Grid, Button, Typography } from "@material-ui/core";
import { BsChatDots } from "react-icons/bs";
import { Link } from "react-router-dom";

import Banner from "../Components/Banner";
import RunningText from "../Components/RunningText";

import Search from "../Components/Search";

import SpinnerCenter from "../Components/SpinnerCenter";
import ResultList from "../Components/ResultList";

import axios from "axios";

export default function Template({ children = null }) {
    const [searchText, setSearchText] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [results, setResults] = useState([]);

    useEffect(() => {
        if (searchText.length > 2) {
            setIsLoading(true);
            axios
                .get(location.origin + "/api/search/" + searchText)
                .then((resp) => {
                    let arrNews = resp.data.news;
                    let arrContents = resp.data.contents;
                    setResults([...arrNews, ...arrContents]);
                    setIsLoading(false);
                });
        }
    }, [searchText]);

    return (
        <div className="bg-light pt-2">
            <Grid container spacing={3} className="mb-3 w-100">
                <Grid item xs={6} container justify="flex-start">
                    {children && (
                        <Typography
                            color="secondary"
                            className="ml-2"
                            variant="h5"
                            component="h2"
                            gutterBottom
                        >
                            TELKOMSEL DIGITAL SOLUTION CARE CENTER
                        </Typography>
                    )}
                </Grid>

                <Grid item xs={6} container justify="flex-end">
                    <Grid item xs={8} container justify="flex-end">
                        <Link className="text-decoration-none" to="/">
                            <Button
                                className="mr-2"
                                variant="contained"
                                color="secondary"
                            >
                                Home
                            </Button>
                        </Link>
                        <Link className="text-decoration-none" to="/news">
                            <Button
                                className="mr-2"
                                variant="contained"
                                color="secondary"
                            >
                                News
                            </Button>
                        </Link>
                        <Link className="text-decoration-none" to="/dashboard">
                            <Button
                                className="mr-2"
                                variant="contained"
                                color="secondary"
                            >
                                Dashboard
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Search
                            setIsLoading={setIsLoading}
                            isLoading={isLoading}
                            setSearch={setSearchText}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {searchText.length > 2 ? (
                <Fragment>
                    {isLoading ? (
                        <SpinnerCenter />
                    ) : (
                        <ResultList
                            results={results}
                            handleClose={() => {
                                searchText("");
                            }}
                        />
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    {children ? (
                        <div className="p-2">
                            {children}
                            <div
                                className="w-100"
                                style={{ position: "absolute", bottom: 0 }}
                            >
                                <Banner />
                                <RunningText text="Selamat Datang di Portal TDSCC" />
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <Grid container spacing={5}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Typography
                                        color="secondary"
                                        className="vertical-center"
                                        variant="h4"
                                        component="h2"
                                        gutterBottom
                                    >
                                        TELKOMSEL DIGITAL SOLUTION
                                        <br />
                                        CARE CENTER
                                    </Typography>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <img
                                        style={{ maxHeight: "250px" }}
                                        className="img-fluid rounded m-3"
                                        src={
                                            location.origin +
                                            "/images/gedung1.jpg"
                                        }
                                    />
                                    <img
                                        style={{ maxHeight: "250px" }}
                                        className="img-fluid rounded m-3"
                                        src={
                                            location.origin +
                                            "/images/gedung2.jpg"
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
}
