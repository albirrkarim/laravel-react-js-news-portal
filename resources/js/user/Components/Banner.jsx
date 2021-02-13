import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import axios from "axios";

export default function Banner() {
    const [file, setFile] = useState();

    useEffect(() => {
        axios.get(location.origin + "/api/getsetting/banner").then((resp) => {
            setFile(resp.data.file);
        });
    }, []);

    return (
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
                {file && (
                    <img
                        className="img-fluid"
                        style={{ maxHeight: "100px" }}
                        src={location.origin + "/storage/files/" + file}
                    />
                )}
            </Grid>
        </Grid>
    );
}
