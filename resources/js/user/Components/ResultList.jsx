import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";

import ResultItem from "./ResultItem";

export default function ResultList({ results, handleClose }) {
    return (
        <Grid container justify="center">
            <Grid item lg={6} md={6} sm={12} xs={12}>
                {results.length == 0 ? (
                    <h5 className="text-muted text-center">Not found !</h5>
                ) : (
                    <Fragment>
                        {results.map((item, idx) => (
                            <ResultItem
                                key={idx}
                                item={item}
                                handleClose={handleClose}
                            />
                        ))}
                    </Fragment>
                )}
            </Grid>
        </Grid>
    );
}
