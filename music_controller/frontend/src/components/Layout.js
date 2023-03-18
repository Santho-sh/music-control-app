import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout(params) {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/join">Join</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default Layout;
