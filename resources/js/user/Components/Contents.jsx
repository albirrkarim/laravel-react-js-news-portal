import React, { useEffect, useState,Fragment } from "react";
import { Grid, Button } from "@material-ui/core";
import axios from "axios";

import CardContents from "./CardContents";
import SpinnerCenter from "./SpinnerCenter";

export default function Contents({ category_id }) {
    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(location.origin + "/api/contents/category/" + category_id)
            .then((resp) => {
                setContents(resp.data);
                setIsLoading(false);
            });
    }, [category_id]);

    return (
        <Fragment>
            {
                isLoading ? <SpinnerCenter/> : 
                <Fragment>
                    {
                        contents.length == 0 ? 
                        <p className="text-center text-muted m-3" >Data kosong</p>
                        :
                        <Grid container spacing={4} className="mt-2">
                            {contents.map((item, idx) => (
                                <CardContents key={idx} item={item} />
                            ))}
                        </Grid>
                    }
                </Fragment>
                
            }
        </Fragment>
    );
}
