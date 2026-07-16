export default function WalletTable({ wallets }) {

    function copy(text) {

        navigator.clipboard.writeText(text);

    }

    return (

        <div className="overflow-auto rounded-xl border border-slate-700">

            <table className="w-full">

                <thead className="bg-slate-800 text-white">

                    <tr>

                        <th className="p-3">

                            ✓

                        </th>

                        <th className="p-3">

                            #

                        </th>

                        <th className="p-3">

                            Address

                        </th>

                        <th className="p-3">

                            Balance

                        </th>

                        <th className="p-3">

                            Nonce

                        </th>

                        <th className="p-3">

                            RPC

                        </th>

                        <th className="p-3">

                            Worker

                        </th>

                        <th className="p-3">

                            Status

                        </th>

                        <th className="p-3">

                            TxHash

                        </th>

                        <th className="p-3">

                            Action

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        wallets.length === 0 && (

                            <tr>

                                <td

                                    colSpan="10"

                                    className="text-center py-10"

                                >

                                    Belum ada wallet

                                </td>

                            </tr>

                        )

                    }

                    {

                        wallets.map((wallet, index) => (

                            <tr

                                key={wallet.id}

                                className="border-t border-slate-700 hover:bg-slate-900"

                            >

                                <td className="text-center">

                                    <input

                                        type="checkbox"

                                        checked={wallet.selected}

                                        readOnly

                                    />

                                </td>

                                <td>

                                    {index + 1}

                                </td>

                                <td>

                                    <div className="flex gap-2 items-center">

                                        <span>

                                            {wallet.address}

                                        </span>

                                        <button

                                            onClick={() => copy(wallet.address)}

                                        >

                                            📋

                                        </button>

                                    </div>

                                </td>

                                <td>

                                    {wallet.balance}

                                </td>

                                <td>

                                    {wallet.nonce}

                                </td>

                                <td>

                                    {wallet.rpc ?? "-"}

                                </td>

                                <td>

                                    {wallet.worker ?? "-"}

                                </td>

                                <td>

                                    {wallet.status}

                                </td>

                                <td>

                                    {

                                        wallet.txHash

                                            ?

                                            (

                                                <button

                                                    onClick={() => copy(wallet.txHash)}

                                                >

                                                    Copy

                                                </button>

                                            )

                                            :

                                            "-"

                                    }

                                </td>

                                <td>

                                    <button>

                                        Retry

                                    </button>

                                    {" "}

                                    <button>

                                        Remove

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}