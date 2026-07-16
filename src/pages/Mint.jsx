import MintForm from "../components/mint/MintForm";
import MintControl from "../components/mint/MintControl";
import MintStatus from "../components/mint/MintStatus";

import useMint from "../hooks/useMint";
import useWallet from "../hooks/useWallet";

import { startMint } from "../services/mintEngine";

export default function Mint() {

    const mint = useMint();

    const { wallets } = useWallet();

    async function handleStart() {

        mint.setRunning(true);

        mint.setSuccess(0);

        mint.setFailed(0);

        mint.setCurrentWallet(null);

        mint.setCurrentTx("");

        await startMint({

            wallets,

            onWallet: (wallet) => {

                mint.setCurrentWallet(wallet);

            },

            onSuccess: () => {

                mint.setSuccess(v => v + 1);

            },

            onFailed: () => {

                mint.setFailed(v => v + 1);

            },

            onFinish: () => {

                mint.setRunning(false);

            }

        });

    }

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold text-white">

                Mint Engine

            </h1>

            <MintForm />

            <MintControl

                running={mint.running}

                onStart={handleStart}

                onStop={() => mint.setRunning(false)}

            />

            <MintStatus

                running={mint.running}

                success={mint.success}

                failed={mint.failed}

                currentWallet={mint.currentWallet}

                currentTx={mint.currentTx}

            />

        </div>

    );

}