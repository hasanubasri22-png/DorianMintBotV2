import { BrowserRouter } from "react-router-dom";

import { WalletProvider } from "@/context/WalletContext";

export default function AppProviders({ children }) {

    return (

        <BrowserRouter>

            <WalletProvider>

                {children}

            </WalletProvider>

        </BrowserRouter>

    );

}