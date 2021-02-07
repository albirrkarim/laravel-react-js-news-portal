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

import Template from "./Template";

export default function HomePage (){
	return (
		<Template>
			<h1 className="text-center">Dashboard</h1>
				

		</Template>
	)
}