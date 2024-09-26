import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import AddCoffee from "../pages/AddCoffee/AddCoffee";
import UpdateCoffee from "../pages/UpdateCoffee/UpdateCoffee";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRouter from "./PrivateRouter/PrivateRouter";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/coffees')
            },
            {
                path: '/addCoffee',
                element: <PrivateRouter><AddCoffee></AddCoffee></PrivateRouter>
            }, 
            {
                path: '/updateCoffee/:id',
                loader: ({params}) => fetch(`http://localhost:5000/coffees/${params.id}`),
                element: <PrivateRouter><UpdateCoffee></UpdateCoffee></PrivateRouter>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]   
    }
]);

export default router;