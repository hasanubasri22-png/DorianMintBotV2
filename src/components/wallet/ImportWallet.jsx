import { useState } from "react";
import { importPrivateKeys } from "../../services/walletService";

export default function ImportWallet({ onImport }) {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleImport() {

        if (!text.trim()) {
            alert("Silakan masukkan minimal satu private key.");
            return;
        }

        try {

            setLoading(true);

            const wallets = await importPrivateKeys(text);

            onImport(wallets);

            setText("");

        } catch (err) {

            console.error(err);
            alert("Gagal mengimpor wallet.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-5">

            <h2 className="text-lg font-semibold text-white mb-4">
                Import Wallet
            </h2>

            <textarea
                rows={8}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste private key (1 baris = 1 wallet)"
                className="
                    w-full
                    rounded-lg
                    border
                    border-slate-700
                    bg-slate-950
                    text-white
                    placeholder:text-slate-500
                    p-4
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            />

            <div className="mt-4 flex justify-end">

                <button
                    onClick={handleImport}
                    disabled={loading}
                    className="
                        px-5
                        py-2
                        rounded-lg
                        bg-blue-600
                        hover:bg-blue-700
                        disabled:bg-slate-600
                        text-white
                        font-semibold
                        transition
                    "
                >
                    {loading ? "Importing..." : "Import Wallet"}
                </button>

            </div>

        </div>

    );

}