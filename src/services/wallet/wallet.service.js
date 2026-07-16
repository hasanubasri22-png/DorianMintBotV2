import { WalletAction } from "@/reducers/walletReducer";
import { WalletRepository } from "@/repositories/wallet";

export function createWalletService(dispatch) {

    const repository = new WalletRepository();

    return {

        importWallets(wallets) {

            dispatch({
                type: WalletAction.IMPORT_WALLETS,
                payload: wallets
            });

        },

        addWallet(wallet) {

            dispatch({
                type: WalletAction.ADD_WALLET,
                payload: wallet
            });

        },

        removeWallet(id) {

            dispatch({
                type: WalletAction.REMOVE_WALLET,
                payload: id
            });

        },

        updateWallet(id, data) {

            dispatch({
                type: WalletAction.UPDATE_WALLET,
                payload: {
                    id,
                    data
                }
            });

        },

        updateStatus(id, status) {

            dispatch({
                type: WalletAction.UPDATE_STATUS,
                payload: {
                    id,
                    status
                }
            });

        },

        updateBalance(id, balance) {

            dispatch({
                type: WalletAction.UPDATE_BALANCE,
                payload: {
                    id,
                    balance
                }
            });

        },

        updateNonce(id, nonce) {

            dispatch({
                type: WalletAction.UPDATE_NONCE,
                payload: {
                    id,
                    nonce
                }
            });

        },

        updateTxHash(id, txHash) {

            dispatch({
                type: WalletAction.UPDATE_TXHASH,
                payload: {
                    id,
                    txHash
                }
            });

        },

        selectAll() {

            dispatch({
                type: WalletAction.SELECT_ALL
            });

        },

        unselectAll() {

            dispatch({
                type: WalletAction.UNSELECT_ALL
            });

        },

        toggleSelect(id) {

            dispatch({
                type: WalletAction.TOGGLE_SELECT,
                payload: id
            });

        },

        clearFinished() {

            dispatch({
                type: WalletAction.CLEAR_FINISHED
            });

        },

        resetWallets() {

            dispatch({
                type: WalletAction.RESET_WALLETS
            });

        },

        async saveSession(wallets) {

            return await repository.save(wallets);

        },

        async loadSession() {

            return await repository.getAll();

        },

        async clearSession() {

            return await repository.clear();

        }

    };

}