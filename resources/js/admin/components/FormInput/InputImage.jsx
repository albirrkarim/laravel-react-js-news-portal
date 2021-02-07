import React, { useState, Fragment } from "react";

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
import { normalize, makeName, str_limit, isImageFile, isDocument } from "../../utils/helper";

import Caption from "../Caption";
import UploadImage from "../Tutorial/UploadImage";
import ImageViewer from "../ImageViewer";

export default function InputImage({ item, value, setValue }) {
    let { name, srcBefore } = item;

    const [fileName, setFileName] = useState("Select file");

    let changeFile = e => {
        setValue(e.target.files[0]);
        setFileName(makeName(e.target.value));
    };

    return (
        <Caption text={<UploadImage />}>
            <div className="mt-3">
                <p className="m-0">{name}</p>


                {
                    srcBefore && 
                    <Fragment>
                        {isImageFile(srcBefore) && (
                            <ImageViewer src={srcBefore} />
                        )}

                        {isDocument(srcBefore) && 
                            <a href={srcBefore} target="_blank" >
                                Open pdf
                            </a>
                        }
                    </Fragment>
                }
                

                <Button variant="contained" className="mt-3" component="label" fullWidth>
                    {fileName}
                    <input
                        type="file"
                        onChange={changeFile}
                        style={{ display: "none" }}
                        name={name}
                    />
                </Button>
            
            </div>
        </Caption>
    );
}
