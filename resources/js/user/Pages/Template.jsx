import React, {
    Suspense,
    lazy,
    useEffect,
    useState,
    useContext,
    Fragment,

} from "react";

import { Grid,Button,Typography } from "@material-ui/core";
import { BsChatDots } from "react-icons/bs";
import {Link} from 'react-router-dom';

import Banner from "../Components/Banner";
import RunningText from "../Components/RunningText";

export default function Template ({children=null}){
	return (
		<Fragment>
			<Grid container justify="flex-end">
                <Link to="/">
                    <Button variant="contained" color="secondary">
                      Home
                    </Button>
                 </Link>
                <Link to="/news">
                    <Button variant="contained" color="secondary">
                      News
                    </Button>
                </Link>
                <Link to="/dashboard">
                    <Button variant="contained" color="secondary">
                      Dashboard
                    </Button>
                </Link>
            </Grid>

            {
                children ? 
                    (
                        <Fragment>
                            {children}

                            <Banner/>
                            <RunningText text="CCCCCCCCc"/>
                        </Fragment>
                    )
                     : (
                    <Fragment>
                        <Grid container spacing={5}>
                            <Grid item xs={6}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    TELKOMSEL DIGITAL SOLUTION
                                    CARE CENTER
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <img className="img-fluid rounded m-3" src={location.origin+"/images/gedung1.jpg"} />
                                <img className="img-fluid rounded m-3" src={location.origin+"/images/gedung2.jpg"} />
                            </Grid>
                        </Grid>

                    </Fragment>
                )
            }
		</Fragment>
	)
}