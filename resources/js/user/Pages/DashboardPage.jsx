import React, {
    Suspense,
    lazy,
    useEffect,
    useState,
    useContext,
    Fragment,
} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import { BsChatDots } from "react-icons/bs";

import Template from "./Template";
import TabsDashboard from "../Components/TabsDashboard";
import moment from 'moment';
import ImageViewer from "../Components/ImageViewer";

export default function DashboardPage() {
    let { contents_id } = useParams();

    const [contents, setContents] = useState(null);

    useEffect(() => {
        if (contents_id) {
            axios
                .get(location.origin + "/api/contents/detail/" + contents_id)
                .then((resp) => {
                    if (resp.data.status) {
                        setContents(resp.data.data);
                    } else {
                        alert("Loading failed ...");
                    }
                });
        }
    }, [contents_id]);

    return (
        <Template>
            <h1 className="text-center mb-3">Dashboard</h1>

            {contents && contents_id ? (
                <Fragment>
                    <Grid container justify="center">
                        <Link to="/dashboard">
                            <Button
                                color="primary" variant="outlined" >
                                Back
                            </Button>
                        </Link>
                    </Grid>
                    
                    <Grid container justify="center">
                        <Grid item xs={8} className="scrollable p-2">
                            

                            <h4 className="mb-3">{contents.name}</h4>
                            <p
                                style={{ opacity: "0.85" }}
                                className="text-justify"
                                dangerouslySetInnerHTML={{
                                    __html: contents.text,
                                }}
                            ></p>

                            <p className="text-center text-muted" >
                                {moment(
                                    contents.created_at
                                ).format(
                                    'DD MMMM YYYY, h:mm'
                                )}
                            </p>
                            
                            {
                                contents.file &&
                                <div className="p-3">
                                    <ImageViewer src={location.origin+"/storage/images/"+contents.file} />
                                </div>
                            }
                            
                        </Grid>
                    </Grid>
                </Fragment>
            ) : (
                <TabsDashboard />
            )}
        </Template>
    );
}
