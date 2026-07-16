import { STATUS } from "@/constants/status";
import { createWallet, createWalletList } from "@/services/wallet";

export const initialWalletState = {
    wallets: [],
};

export const WalletAction = {
    IMPORT_WALLETS: "IMPORT_WALLETS",
    ADD_WALLET: "ADD_WALLET",
    REMOVE_WALLET: "REMOVE_WALLET",
    UPDATE_WALLET: "UPDATE_WALLET",
    UPDATE_STATUS: "UPDATE_STATUS",
    UPDATE_BALANCE: "UPDATE_BALANCE",
    UPDATE_NONCE: "UPDATE_NONCE",
    UPDATE_TXHASH: "UPDATE_TXHASH",
    RESET_WALLETS: "RESET_WALLETS",
    CLEAR_FINISHED: "CLEAR_FINISHED",
    SELECT_ALL: "SELECT_ALL",
    UNSELECT_ALL: "UNSELECT_ALL",
    TOGGLE_SELECT: "TOGGLE_SELECT",
};

export default function walletReducer(state, action) {

    switch (action.type) {

        case WalletAction.IMPORT_WALLETS:

            return {
                ...state,
                wallets: [
                    ...state.wallets,
                    ...createWalletList(action.payload),
                ],
            };

        case WalletAction.ADD_WALLET:

            return {
                ...state,
                wallets: [
                    ...state.wallets,
                    createWallet(action.payload),
                ],
            };

        case WalletAction.REMOVE_WALLET:

            return {
                ...state,
                wallets: state.wallets.filter(
                    wallet => wallet.id !== action.payload
                ),
            };

        case WalletAction.UPDATE_WALLET:

            return {
                ...state,
                wallets: state.wallets.map(wallet =>
                    wallet.id === action.payload.id
                        ? {
                            ...wallet,
                            ...action.payload.data,
                        }
                        : wallet
                ),
            };

        case WalletAction.UPDATE_STATUS:

            return {
                ...state,
                wallets: state.wallets.map(wallet =>
                    wallet.id === action.payload.id
                        ? {
                            ...wallet,
                            status: action.payload.status,
                        }
                        : wallet
                ),
            };

        case WalletAction.UPDATE_BALANCE:

            return {
                ...state,
                wallets: state.wallets.map(wallet =>
                    wallet.id === action.payload.id
                        ? {
                            ...wallet,
                            balance: action.payload.balance,
                        }
                        : wallet
                ),
            };

        case WalletAction.UPDATE_NONCE:

            return {
                ...state,
                wallets: state.wallets.map(wallet =>
                    wallet.id === action.payload.id
                        ? {
                            ...wallet,
                            nonce: action.payload.nonce,
                        }
                        : wallet
                ),
            };

        case WalletAction.UPDATE_TXHASH:

            return {
                ...state,
                wallets: state.wallets.map(wallet =>
                    wallet.id === action.payload.id
                        ? {
                            ...wallet,
                            txHash: action.payload.txHash,
                        }
                        : wallet
                ),
            };

        case WalletAction.SELECT_ALL:

            return {
                ...state,
                wallets: state.wallets.map(wallet => ({
                    ...wallet,
                    selected: true,
                })),
            };

        case WalletAction.UNSELECT_ALL:

            return {
                ...state,
                wallets: state.wallets.map(wallet => ({
                    ...wallet,
                    selected: false,
                })),
            };

        case WalletAction.TOGGLE_SELECT:

            return {
                ...state,
                wallets: state.wallets.map(wallet =>
                    wallet.id === action.payload
                        ? {
                            ...wallet,
                            selected: !wallet.selected,
                        }
                        : wallet
                ),
            };

        case WalletAction.CLEAR_FINISHED:

            return {
                ...state,
                wallets: state.wallets.filter(
                    wallet => wallet.status !== STATUS.SUCCESS
                ),
            };

        case WalletAction.RESET_WALLETS:

            return initialWalletState;

        default:

            return state;

    }

}