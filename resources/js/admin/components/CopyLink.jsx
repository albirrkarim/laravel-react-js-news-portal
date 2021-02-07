import React, { useState, useRef } from "react";
import { Button, Grid, Input } from "@material-ui/core";
import { FaCopy } from "react-icons/fa";

const CopyLink = ({ link }) => {
    const inputRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState("Copy");

    function copyToClipboard(e) {
        let a = inputRef.current;

        a.select();
        a.setSelectionRange(0, 99999);
        document.execCommand("copy");

        setCopySuccess("Copied!");

        setTimeout(() => {
            setCopySuccess("Copy");
        }, 3000);
    }
    return (
        <Grid container className="mt-2" spacing={1}>
            <Grid item md={8} sm={8} xs={12}>
                <Input
                    inputProps={{
                        "aria-label": "copy link",
                        ref: inputRef
                    }}
                    className="w-100"
                    defaultValue={link}
                    onChange={() => {}}
                />
            </Grid>

            <Grid item md={4} sm={4} xs={12} container justify="center">
                <Button
                    onClick={copyToClipboard}
                    variant="contained"
                    color="default"
                    size="small"
                    disabled={copySuccess == "Copied!"}
                    startIcon={<FaCopy />}
                >
                    {copySuccess}
                </Button>
            </Grid>
        </Grid>
    );
};

export default CopyLink;
