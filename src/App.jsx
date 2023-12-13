import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { Departure } from "./views/Departure";
import { useCallback, useState } from "react";
import { HomePage } from "./views/HomePage";
import "./assets/styles/global.scss";
import { AppFooter } from "./components/AppFooter";

function App() {
    const [title, setTitle] = useState("Complex Gallery");

    const handleSetTitle = useCallback(
        (newTitle) => {
            setTitle(newTitle);
        },
        [title]
    );

    return (
        <section className="main-container">
            <Router>
                <AppHeader title={title} />
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage setTitle={handleSetTitle} />}
                    />
                    <Route
                        path="/departure/:id"
                        element={<Departure setTitle={handleSetTitle} />}
                    />
                </Routes>
                <AppFooter />
            </Router>
        </section>
    );
}

export default App;
