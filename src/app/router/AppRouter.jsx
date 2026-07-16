import { Routes, Route } from "react-router-dom";

import MainLayout from "@/app/layouts/MainLayout";

import Dashboard from "@/pages/Dashboard";
import Wallet from "@/pages/Wallet";
import Mint from "@/pages/Mint";
import Logs from "@/pages/Logs";
import Settings from "@/pages/Settings";

export default function AppRouter() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/wallet"
                    element={<Wallet />}
                />

                <Route
                    path="/mint"
                    element={<Mint />}
                />

                <Route
                    path="/logs"
                    element={<Logs />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

            </Route>

        </Routes>
    );
}