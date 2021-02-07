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

import InputText from "./FormInput/InputText";
import InputCkEditor from "./FormInput/InputCkEditor";
import InputImage from "./FormInput/InputImage";

import { normalize, makeName, str_limit } from "../utils/helper";


export default ({ arr, value, setValue }) => {
    return (
        <Fragment>
            {arr.map((item, idx) => {
                let { type } = item;

                const foo = v => {
                    let newValue = value.slice();
                    newValue[idx] = v;
                    setValue(newValue);
                };

                if (type == "text") {
                    return (
                        <InputText
                            key={idx}
                            item={item}
                            value={value[idx]}
                            setValue={foo}
                        />
                    );
                } else if (type == "ckeditor") {
                    return (
                        <InputCkEditor
                            key={idx}
                            item={item}
                            value={value[idx]}
                            setValue={foo}
                        />
                    );
                } else if (type == "image"||type=="document") {
                    return (
                        <InputImage
                            key={idx}
                            item={item}
                            value={value[idx]}
                            setValue={foo}
                        />
                    );
                }
                else if (type=="url_youtube"){
                    return (
                        <InputText
                            key={idx}
                            item={item}
                            value={value[idx]}
                            setValue={foo}
                        />
                    );

                }

                return "";
            })}
        </Fragment>
    );
};
