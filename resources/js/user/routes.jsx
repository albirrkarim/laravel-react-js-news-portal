import React from "react";
import { Navigate } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import NewsPage from "./Pages/NewsPage";
import DashboardPage from "./Pages/DashboardPage";

const routes = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/news",
        element: <NewsPage />
    },

    {
        path: "/news/:news_name",
        element: <NewsPage />
    },

    {
        path: "/dashboard",
        element: <DashboardPage />
    },

    {
        path: "/dashboard/:contents_name",
        element: <DashboardPage />
    },

];

export default routes;
