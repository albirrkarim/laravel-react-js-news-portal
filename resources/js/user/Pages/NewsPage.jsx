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
import {Link,useParams} from 'react-router-dom';

import Template from "./Template";

import axios from 'axios';

import CardNews from "../Components/CardNews";

export default function HomePage (){

	let { news_id } = useParams();

	// const [news_id,setNewsId]=useState(null);
	const [news,setNews]=useState(null);

	const [newsList,setNewsList]=useState([]);

	const [newsLeft,setNewsLeft]=useState([]);
	const [newsRight,setNewsRight]=useState([]);

	useEffect(()=>{

		if(newsList.length==0){
			axios.get(location.origin+"/api/newsall").then((resp)=>{
				let arrData= resp.data;
				setNewsList(arrData);

				let len =arrData.length;

				if(len>0){
					setNews(arrData[0]);
				}

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
			<h1 className="text-center">NEWS FEED</h1>
			
			<Grid container spacing={7} className="mt-2 mb-2 w-100 bg-light">
				<Grid item lg={3} md={3} sm={12} xs={12} className="scrollable">
					{
						newsLeft.map((item,idx)=>(
							<CardNews key={idx} item={newsList[item]}  />
						))	
					}

				</Grid>

				<Grid item lg={6} md={6} sm={12} xs={12} className="scrollable">
					{
						news && (
							<Fragment>
								<h4 className="mb-3">{news.name}</h4>
								<p
			                        style={{ opacity: "0.85" }}
			                        className="text-justify"
			                        dangerouslySetInnerHTML={{
			                            __html: news.text,
			                        }}
			                    ></p>
							</Fragment>
						)
					}
				</Grid>

				<Grid item lg={3} md={3} sm={12} xs={12} className="scrollable">
					{
						newsRight.map((item,idx)=>(
							<CardNews key={idx} item={newsList[item]}  />
						))	 
					}
				</Grid>
			</Grid>
		</Template>
	)
}