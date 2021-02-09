import React, { useState } from "react";
import { TextField } from "@material-ui/core";

export default function Search({
    setSearch,
    setIsLoading,
    isLoading,

    label = "Search",
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
        <div>
            <TextField
                label={label}
                fullWidth={true}
                type="search"
                value={text}
                size="small"
                onChange={doSearch}
                variant="outlined"
                placeholder={placeholder}
                color="primary"
            />

            {text.length > 0 && text.length < 3 && (
                <small className="text-muted">
                    At least 3 character to search !
                </small>
            )}
        </div>
    );
}
