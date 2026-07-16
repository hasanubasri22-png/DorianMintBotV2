import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";

import walletReducer, {
    initialWalletState,
} from "@/reducers/walletReducer";

import { createWalletService } from "@/services/wallet";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {

    const [state, dispatch] = useReducer(
        walletReducer,
        initialWalletState
    );

    const walletService = useMemo(
        () => createWalletService(dispatch),
        [dispatch]
    );

    useEffect(() => {

        walletService.loadSession()
            .then(wallets => {

                if (wallets.length) {

                    walletService.importWallets(wallets);

                }

            });

    }, []);

    useEffect(() => {

        walletService.saveSession(
            state.wallets
        );

    }, [state.wallets]);

    const value = useMemo(() => ({

        wallets: state.wallets,

        ...walletService

    }), [

        state.wallets,

        walletService

    ]);

    return (

        <WalletContext.Provider value={value}>

            {children}

        </WalletContext.Provider>

    );

}

export function useWalletContext() {

    const context = useContext(WalletContext);

    if (!context) {

        throw new Error(
            "useWalletContext harus digunakan di dalam WalletProvider."
        );

    }

    return context;

}

export default WalletContext;