import { Outlet } from "react-router-dom";

const PrivateLayout = ():React.JSX.Element => {
    return (
        <main className="w-full bg-[#081E5A]">
            <Outlet />
        </main>
    )
}

export { PrivateLayout }