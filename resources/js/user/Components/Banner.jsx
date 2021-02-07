import React, {
    Suspense,
    lazy,
    useEffect,
    useState,
    useContext,
    Fragment,

} from "react";

import { Grid,Button } from "@material-ui/core";
import { BsChatDots } from "react-icons/bs";
import {Link} from 'react-router-dom';
import axios from 'axios';


export default function HomePage (){

  const [file,setFile]=useState("#");

  useEffect(()=>{
    axios.get(location.origin+"/api/getsetting/banner").then((resp)=>{
      setFile(resp.data.file);
    });
  },[]);

  return (
    <Grid container justify="center" className="mt-3">
      <Grid item xs={8} container justify="center" >
        <img className="img-fluid" style={{maxHeight:"100px"}} src={location.origin+"/storage/logo/"+file} />
      </Grid>
    </Grid>
  )
}