import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <div>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/join">Join</Link>
                <Link to="/create">Create</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;
