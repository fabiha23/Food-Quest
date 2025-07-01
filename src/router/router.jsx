import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import MealDetails from "../pages/MealDetails";
import Bookmarked from "../pages/Bookmarked";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'/meal/:id',
          Component:MealDetails
        },
        {
          path:'/bookmarks',
          Component:Bookmarked
        }
    ]
  },
]);