import React, { Fragment } from "react";

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    CircularProgress,
    Button,
    makeStyles
} from "@material-ui/core";
import Caption from "../Caption";

export default function InputText({ item, value, setValue }) {
    let { name, placeholder, isRequired, type } = item;

    let isSosmed = name == "email" || name == "contact";
    let isYoutube = type == "url_youtube";

    let isFocused = isSosmed || isYoutube;

    if (isFocused) {
        return (
            <Caption
                text={
                    isSosmed
                        ? "Bagian ini bisa di isi link instagram / github / facebook / nomor telepon"
                        : "Bagian ini bisa di isi link youtube"
                }
            >
                <TextField
                    label={name}
                    required={isRequired == false ? false : true}
                    fullWidth
                    margin="dense"
                    onChange={e => {
                        setValue(e.target.value);
                    }}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    variant="outlined"
                />
            </Caption>
        );
    }

    return (
        <TextField
            label={name}
            required={isRequired == false ? false : true}
            fullWidth
            margin="dense"
            onChange={e => {
                setValue(e.target.value);
            }}
            value={value ? value : ""}
            name={name}
            placeholder={placeholder}
            variant="outlined"
        />
    );
}
