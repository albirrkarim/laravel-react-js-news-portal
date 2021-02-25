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

import RunningText from "../Components/RunningText";

import Search from "../Components/Search";

import SpinnerCenter from "../Components/SpinnerCenter";
import ResultList from "../Components/ResultList";
import ImageBanner from "../Components/ImageBanner";

import {Helmet} from "react-helmet";
import axios from "axios";

import TextSetting from "../Components/TextSetting";

export default function Template({ mode=null, children = null }) {
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


    const [value, setValue] = useState("");

    useEffect(()=>{
        axios.get(location.origin + "/api/getsetting/title").then((resp) => {
            setValue(resp.data.value);
        });
    },[])

    return (
        <div className="bg-light">
            <Helmet>
                <title>{`${mode} | ${value}`}</title>
            </Helmet>
            <Grid container spacing={3} className="mb-3 mt-2 w-100">
                <Grid item lg={6} md={6} sm={12} xs={12} container justify="flex-start">
                    {children && (
                        <Link className="text-decoration-none" to="/">
                            <ImageBanner className="ml-2" style={{maxWidth:"200px", maxHeight : "100px"}} text="logo" />
                        </Link>
                    )}
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} container justify="flex-end">
                    <Grid item lg={8} md={8} sm={12} xs={12} className="mb-2" container justify="flex-end">
                        <Link className="text-decoration-none" to="/">
                            <Button
                                className="mr-2"
                                variant="contained"
                                color="primary"
                            >
                                Home
                            </Button>
                        </Link>
                        <Link className="text-decoration-none" to="/news">
                            <Button
                                className="mr-2"
                                variant="contained"
                                color="primary"
                            >
                                News
                            </Button>
                        </Link>
                        <Link className="text-decoration-none" to="/dashboard">
                            <Button
                                className="mr-2"
                                variant="contained"
                                color="primary"
                            >
                                Dashboard
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} className="mb-2">
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
                                setSearchText("");
                            }}
                        />
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    {children ? (
                        <div className="p-2">
                            {children}
                          
                            <Grid container justify="center" className="mt-4 mb-1">
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={12}
                                    xs={12}
                                    container
                                    justify="center"
                                >
                                    <ImageBanner style={{ maxHeight: "200px" }} text="banner_bottom" />
                                </Grid>
                            </Grid>             
                            <RunningText text={<TextSetting text="running_text" placeholder="Selamat Datang di Portal TDSCC" />} />
                    
                        </div>
                    ) : (
                        
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <ImageBanner text="banner_left" />
                            </Grid>

                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <div className={(window.innerWidth>800? "vertical-center" :"" )+" bg-light rounded p-2"}>
                                    <ImageBanner
                                        style={ (window.innerWidth>800 ? {maxWidth:"400px"} : {} )} 
                                        text="logo" 
                                        placeholder={location.origin+"/images/tdscc.png"}
                                    />
                                </div>
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <ImageBanner 
                                    style={{maxWidth:"300px"}} 
                                    className="rounded m-3" 
                                    placeholder={location.origin+"/images/gedung1.jpg"}
                                    text="home1" 
                                />
                                <ImageBanner 
                                    style={{maxWidth:"300px"}} 
                                    className="rounded m-3" 
                                    placeholder={location.origin+"/images/gedung2.jpg"}
                                    text="home2" 
                                />
                            </Grid>
                        </Grid>

                    )}
                </Fragment>
            )}
        </div>
    );
}
