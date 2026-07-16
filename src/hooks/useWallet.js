import { useWalletContext } from "../context/WalletContext";

export default function useWallet() {

    const {

        wallets,

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

    } = useWalletContext();

    return {

        wallets,

        importWallets,

        add: addWallet,

        remove: removeWallet,

        update: updateWallet,

        updateStatus,

        updateBalance,

        updateNonce,

        updateTxHash,

        selectAll,

        unselectAll,

        toggleSelect,

        clearFinished,

        reset: resetWallets

    };

}