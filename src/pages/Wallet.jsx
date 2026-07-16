import WalletTable from "../components/wallet/WalletTable";
import WalletStats from "../components/wallet/WalletStats";
import WalletToolbar from "../components/wallet/WalletToolbar";
import ImportWallet from "../components/wallet/ImportWallet";

import useWallet from "../hooks/useWallet";

export default function Wallet() {

    const {

        wallets,

        importWallets

    } = useWallet();

    function handleImport(walletList) {

        importWallets(walletList);

    }

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold text-white">

                Wallet Manager

            </h1>

            <WalletStats

                wallets={wallets}

            />

            <WalletToolbar />

            <ImportWallet

                onImport={handleImport}

            />

            <WalletTable

                wallets={wallets}

            />

        </div>

    );

}