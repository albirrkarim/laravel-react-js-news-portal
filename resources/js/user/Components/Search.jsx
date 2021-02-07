import React, { useState, Fragment } from "react";
import { TextField,Grid } from "@material-ui/core";

export default function Search({
    setSearch,
    setIsLoading,
    isLoading,

    label = "Search room",
    placeholder = "",
}) {
    const [text, setText] = useState("");

    let timeout = null;

    const doSearch = (e) => {
        let str = e.target.value;
        if (timeout) clearTimeout(timeout);
        setText(str);

        if (!isLoading) {
            setIsLoading(true);
        }

        timeout = setTimeout(() => {
            setSearch(str.toLowerCase());
        }, 1000);
    };

    return (
        <Grid container justify="center" className="mb-2">
            <Grid item xs={12} sm={12} md={6} lg={6} className="mb-3" style={{height:"70px"}} >
                <TextField
                    label={label}
                    fullWidth={true}
                    type="search"
                    value={text}
                    onChange={doSearch}
                    variant="outlined"
                    placeholder={placeholder}
                />

                {text.length > 0 && text.length < 3 && (
                    <p className="text-muted mt-2" >At least 3 character to search !</p>
                )}
            </Grid>
        </Grid>
    );
}
