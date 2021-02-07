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

import axios from 'axios';

import CardNews from "../Components/CardNews";

export default function HomePage (){

	const [news_id,setNewsId]=useState(null);
	const [news,setNews]=useState(null);

	const [newsList,setNewsList]=useState([]);

	const [newsLeft,setNewsLeft]=useState([]);
	const [newsRight,setNewsRight]=useState([]);

	useEffect(()=>{

		if(newsList.length==0){
			axios.get(location.origin+"/api/newsall").then((resp)=>{
				setNewsList(resp.data);


				let len =resp.data.length;

				let half = parseInt(len/2);

				let arrLeft=[];
				for(let i=0;i<half;i++){
					arrLeft.push(i);
				}

				let arrRight=[];
				for(let i=half;i<len;i++){
					arrRight.push(i);
				}

				setNewsLeft(arrLeft);
				setNewsRight(arrRight);
			})
		}

		if(news_id){
			axios.get(location.origin+"/api/news/"+news_id).then((resp)=>{
				setNews(resp.data);
			})
		}

	},[news_id]);

	return (
		<Template>
			<h1 className="text-center" >News</h1>
			
			<Grid container spacing={5}>
				<Grid item xs={3}>
					{
						newsLeft.map((item,idx)=>(
							<CardNews key={idx} setNewsId={setNewsId} item={newsList[item]}  />
						))	
					}

				</Grid>

				<Grid item xs={6}>
					{
						news && (
							<Fragment>
								{news.name}
							</Fragment>
						)
					}
				</Grid>

				<Grid item xs={3}>
					 {
						newsRight.map((item,idx)=>(
							<CardNews key={idx} setNewsId={setNewsId} item={newsList[item]}  />
						))	 
					}
				</Grid>
			</Grid>
		</Template>
	)
}