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
import {validURL,makeURL} from "../../utils/helper";

export default function InputText({ item, value, setValue}) {
    let { name, label, placeholder, isRequired, type , tutorial } = item;

    let isSosmed = name == "email" || name == "contact";
    let isYoutube = type == "url_youtube";

    let isFocused = isSosmed || isYoutube;

    if(!label){
        label=name;
    }

    function getTutorial(){

        if(tutorial!=null){
            return tutorial;
        }else{
            if(isSosmed){
                return "Bagian ini bisa di isi link instagram / github / facebook / nomor telepon";
            }

            if(isYoutube){
                return "Bagian ini bisa di isi link youtube";
            }
        }

        return"";
    }

    if (isFocused) {
        return (
            <Caption
                text={
                    getTutorial()
                }
            >
                <TextField
                    label={label}
                    required={isRequired == false ? false : true}
                    fullWidth
                    margin="dense"
                    onChange={e => {
                        let a = e.target.value;

                        if(validURL(a)){
                            a=makeURL(a);
                        }

                        setValue(a);
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
        <Caption
            text={
                getTutorial()
            }
            >

            <TextField
                label={label}
                required={isRequired == false ? false : true}
                fullWidth
                margin="dense"
                onChange={e => {
                    let a = e.target.value;

                    if(validURL(a)){
                        a=makeURL(a);
                    }

                    setValue(a);
                }}
                value={value ? value : ""}
                name={name}
                placeholder={placeholder}
                variant="outlined"
            />

        </Caption>
       
    );
}
