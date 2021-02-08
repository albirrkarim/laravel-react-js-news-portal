import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import axios from "axios";

import CardContents from "./CardContents";

export default function Dashboard({ category_id }) {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        axios
            .get(location.origin + "/api/contents/category/" + category_id)
            .then((resp) => {
                setContents(resp.data);
            });
    }, [category_id]);

    return (
        <Grid container spacing={4} className="mt-2">
            {contents.map((item, idx) => (
                <CardContents key={idx} item={item} />
            ))}
        </Grid>
    );
}
