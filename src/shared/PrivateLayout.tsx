import { Outlet } from "react-router-dom";

const PrivateLayout = ():React.JSX.Element => {
    return (
        <main className="w-full">
            <Outlet />
        </main>
    )
}

export { PrivateLayout }