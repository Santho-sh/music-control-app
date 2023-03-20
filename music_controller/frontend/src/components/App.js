import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
    const [roomCode, setRoomCode] = useState(null);
    const navigate = Navigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/user-room")
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
            });
    }, []);

    const handleHomepage = () => {
        if (roomCode) {
            navigate(`/room/${roomCode}`);
        }
        return <HomePage />;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={handleHomepage} />
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
