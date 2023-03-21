import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/join" element={<JoinRoomPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/room/:roomCode" element={<Room />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
