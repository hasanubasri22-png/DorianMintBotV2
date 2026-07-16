import {
    createContext,
    useContext,
    useMemo,
    useReducer
} from "react";

import walletReducer, {
    initialWalletState,
    WalletAction
} from "../reducers/walletReducer";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {

    const [state, dispatch] = useReducer(
        walletReducer,
        initialWalletState
    );

    /* ===========================
       ACTIONS
    =========================== */

    function importWallets(wallets) {

        dispatch({

            type: WalletAction.IMPORT_WALLETS,

            payload: wallets

        });

    }

    function addWallet(wallet) {

        dispatch({

            type: WalletAction.ADD_WALLET,

            payload: wallet

        });

    }

    function removeWallet(id) {

        dispatch({

            type: WalletAction.REMOVE_WALLET,

            payload: id

        });

    }

    function updateWallet(id, data) {

        dispatch({

            type: WalletAction.UPDATE_WALLET,

            payload: {

                id,

                data

            }

        });

    }

    function updateStatus(id, status) {

        dispatch({

            type: WalletAction.UPDATE_STATUS,

            payload: {

                id,

                status

            }

        });

    }

    function updateBalance(id, balance) {

        dispatch({

            type: WalletAction.UPDATE_BALANCE,

            payload: {

                id,

                balance

            }

        });

    }

    function updateNonce(id, nonce) {

        dispatch({

            type: WalletAction.UPDATE_NONCE,

            payload: {

                id,

                nonce

            }

        });

    }

    function updateTxHash(id, txHash) {

        dispatch({

            type: WalletAction.UPDATE_TXHASH,

            payload: {

                id,

                txHash

            }

        });

    }

    function selectAll() {

        dispatch({

            type: WalletAction.SELECT_ALL

        });

    }

    function unselectAll() {

        dispatch({

            type: WalletAction.UNSELECT_ALL

        });

    }

    function toggleSelect(id) {

        dispatch({

            type: WalletAction.TOGGLE_SELECT,

            payload: id

        });

    }

    function clearFinished() {

        dispatch({

            type: WalletAction.CLEAR_FINISHED

        });

    }

    function resetWallets() {

        dispatch({

            type: WalletAction.RESET_WALLETS

        });

    }

    /* ===========================
       VALUE
    =========================== */

    const value = useMemo(() => ({

        wallets: state.wallets,

        dispatch,

        importWallets,

        addWallet,

        removeWallet,

        updateWallet,

        updateStatus,

        updateBalance,

        updateNonce,

        updateTxHash,

        selectAll,

        unselectAll,

        toggleSelect,

        clearFinished,

        resetWallets

    }), [state]);

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