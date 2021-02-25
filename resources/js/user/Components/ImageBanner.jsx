import React, { Fragment,useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import axios from "axios";

export default function BannerLeft({text="",style={},className="",placeholder=null}) {
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(location.origin + "/api/getsetting/"+text).then((resp) => {
            setFile(resp.data.file);
            setIsLoading(false);
        });
    }, []);

    return (
        <Fragment>
            {file ? (
                <img
                    className={"img-fluid "+className}
                    loading="lazy"
                    style={style}
                    src={location.origin + "/storage/files/" + file}
                />
            ):(
                <Fragment>
                    {
                        (placeholder&&!isLoading) &&

                        <img
                            className={"img-fluid "+className}
                            loading="lazy"
                            style={style}
                            src={placeholder}
                        />
                    }
                    
                </Fragment>
            )}
        </Fragment>
    );
}
