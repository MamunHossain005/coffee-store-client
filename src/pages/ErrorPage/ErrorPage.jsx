import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className=" flex flex-col justify-center items-center h-screen text-red-500 text-2xl font-bold">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred</p>
            <p>
                <i className="text-lg">{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default ErrorPage;