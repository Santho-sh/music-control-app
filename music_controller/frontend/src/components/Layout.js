import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
}

export default Layout;
