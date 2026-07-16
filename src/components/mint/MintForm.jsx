import MintParameterInput from "./MintParameterInput";

import { useState } from "react";

import {

    loadAbi,

    getWriteFunctions,

    getFunctionInputs

} from "../../services/abiService";

import {

    defaultMintConfig

} from "../../services/mintConfig";

export default function MintForm() {

    const [config, setConfig] = useState(

        defaultMintConfig

    );

    const [functions, setFunctions] = useState([]);

    const [inputs, setInputs] = useState([]);

    const [params, setParams] = useState({});

    function update(field, value) {

        setConfig(prev => ({

            ...prev,

            [field]: value

        }));

    }

    function updateParam(name, value) {

        setParams(prev => ({

            ...prev,

            [name]: value

        }));

    }

    async function handleAbi(file) {

        if (!file) return;

        try {

            const abi = await loadAbi(file);

            const writeFunctions =

                getWriteFunctions(abi);

            setFunctions(writeFunctions);

            let selectedFunction = "";

            let functionInputs = [];

            if (writeFunctions.length > 0) {

                selectedFunction =

                    writeFunctions[0].name;

                functionInputs =

                    getFunctionInputs(

                        abi,

                        selectedFunction

                    );

            }

            setInputs(functionInputs);

            setParams({});

            setConfig(prev => ({

                ...prev,

                abi,

                functionName: selectedFunction

            }));

        }

        catch (err) {

            console.error(err);

            alert("ABI tidak valid.");

        }

    }

    function changeFunction(name) {

        update(

            "functionName",

            name

        );

        setInputs(

            getFunctionInputs(

                config.abi,

                name

            )

        );

        setParams({});

    }

    function saveConfiguration() {

        console.log({

            config,

            params

        });

        alert(

            "Configuration berhasil disimpan."

        );

    }

    function startMint() {

        console.clear();

        console.log("========== MINT CONFIG ==========");

        console.log(config);

        console.log("========== PARAMETERS ==========");

        console.log(params);

        alert(

            "Mint Engine akan dihubungkan pada Tahap 7."

        );

    }

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-white mb-6">

                Mint Configuration

            </h2>

            <div className="space-y-6">
                                {/* Contract Address */}

                <div>

                    <label className="block text-white mb-2 font-medium">

                        Contract Address

                    </label>

                    <input

                        type="text"

                        value={config.contract}

                        placeholder="0x..."

                        onChange={(e)=>

                            update(

                                "contract",

                                e.target.value

                            )

                        }

                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />

                </div>

                {/* ABI */}

                <div>

                    <label className="block text-white mb-2 font-medium">

                        ABI File

                    </label>

                    <input

                        type="file"

                        accept=".json"

                        onChange={(e)=>

                            handleAbi(

                                e.target.files?.[0]

                            )

                        }

                        className="block w-full text-slate-300
                        file:mr-4
                        file:px-4
                        file:py-2
                        file:rounded-lg
                        file:border-0
                        file:bg-blue-600
                        file:text-white
                        hover:file:bg-blue-700"

                    />

                </div>

                {/* Function */}

                <div>

                    <label className="block text-white mb-2 font-medium">

                        Mint Function

                    </label>

                    <select

                        value={config.functionName}

                        onChange={(e)=>

                            changeFunction(

                                e.target.value

                            )

                        }

                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"

                    >

                        {

                            functions.length === 0

                            ?

                            (

                                <option>

                                    Upload ABI terlebih dahulu

                                </option>

                            )

                            :

                            (

                                functions.map(fn => (

                                    <option

                                        key={fn.name}

                                        value={fn.name}

                                    >

                                        {fn.name}

                                    </option>

                                ))

                            )

                        }

                    </select>

                </div>

                {/* Dynamic Parameters */}

                {

                    inputs.length > 0 && (

                        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">

                            <h3 className="text-lg font-bold text-white mb-5">

                                Function Parameters

                            </h3>

                            <div className="space-y-5">

                                {

                                    inputs.map((input) => (

                                        <div key={input.name}>

                                            <label className="block text-white mb-2">

                                                {

                                                    input.name ||

                                                    "Parameter"

                                                }

                                                <span className="ml-2 text-slate-400">

                                                    ({input.type})

                                                </span>

                                            </label>

                                            <MintParameterInput

                                                input={input}

                                                value={

                                                    params[input.name]

                                                }

                                                onChange={(value)=>

                                                    updateParam(

                                                        input.name,

                                                        value

                                                    )

                                                }

                                            />

                                        </div>

                                    ))

                                }

                            </div>

                        </div>

                    )

                }
                                {/* Mint Settings */}

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">

                    <h3 className="text-lg font-bold text-white mb-5">

                        Mint Settings

                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block text-white mb-2">

                                Mint Price (ETH)

                            </label>

                            <input

                                type="text"

                                value={config.price}

                                onChange={(e)=>

                                    update(

                                        "price",

                                        e.target.value

                                    )

                                }

                                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white"

                            />

                        </div>

                        <div>

                            <label className="block text-white mb-2">

                                Quantity

                            </label>

                            <input

                                type="number"

                                min="1"

                                value={config.quantity}

                                onChange={(e)=>

                                    update(

                                        "quantity",

                                        Number(e.target.value)

                                    )

                                }

                                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white"

                            />

                        </div>

                        <div>

                            <label className="block text-white mb-2">

                                Gas Limit

                            </label>

                            <input

                                type="number"

                                value={config.gasLimit}

                                onChange={(e)=>

                                    update(

                                        "gasLimit",

                                        Number(e.target.value)

                                    )

                                }

                                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white"

                            />

                        </div>

                        <div>

                            <label className="block text-white mb-2">

                                Max Fee (Gwei)

                            </label>

                            <input

                                type="number"

                                value={config.maxFee}

                                onChange={(e)=>

                                    update(

                                        "maxFee",

                                        Number(e.target.value)

                                    )

                                }

                                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white"

                            />

                        </div>

                        <div>

                            <label className="block text-white mb-2">

                                Priority Fee (Gwei)

                            </label>

                            <input

                                type="number"

                                value={config.priorityFee}

                                onChange={(e)=>

                                    update(

                                        "priorityFee",

                                        Number(e.target.value)

                                    )

                                }

                                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white"

                            />

                        </div>

                        <div>

                            <label className="block text-white mb-2">

                                Delay (ms)

                            </label>

                            <input

                                type="number"

                                min="0"

                                value={config.delay}

                                onChange={(e)=>

                                    update(

                                        "delay",

                                        Number(e.target.value)

                                    )

                                }

                                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white"

                            />

                        </div>

                    </div>

                </div>

                {/* Configuration Preview */}

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">

                    <h3 className="text-lg font-bold text-white mb-4">

                        Configuration Preview

                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div>

                            <div className="text-slate-400">

                                Contract

                            </div>

                            <div className="text-white break-all">

                                {config.contract || "-"}

                            </div>

                        </div>

                        <div>

                            <div className="text-slate-400">

                                Function

                            </div>

                            <div className="text-green-400">

                                {config.functionName || "-"}

                            </div>

                        </div>

                        <div>

                            <div className="text-slate-400">

                                Parameters

                            </div>

                            <div className="text-white">

                                {inputs.length}

                            </div>

                        </div>

                        <div>

                            <div className="text-slate-400">

                                ABI

                            </div>

                            <div
                                className={
                                    config.abi.length
                                        ? "text-green-400"
                                        : "text-red-400"
                                }
                            >

                                {

                                    config.abi.length

                                        ? "Loaded"

                                        : "Not Loaded"

                                }

                            </div>

                        </div>

                    </div>

                </div>

                {/* Status */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">

                        <div className="text-slate-400 text-sm">

                            Network

                        </div>

                        <div className="text-white font-semibold mt-2">

                            Ethereum Mainnet

                        </div>

                    </div>

                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">

                        <div className="text-slate-400 text-sm">

                            Engine

                        </div>

                        <div className="text-blue-400 font-semibold mt-2">

                            Ready

                        </div>

                    </div>

                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">

                        <div className="text-slate-400 text-sm">

                            ABI Functions

                        </div>

                        <div className="text-green-400 font-semibold mt-2">

                            {functions.length}

                        </div>

                    </div>

                </div>

                {/* Actions */}

                <div className="flex flex-wrap gap-4">

                    <button

                        type="button"

                        onClick={saveConfiguration}

                        className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition"

                    >

                        Save Configuration

                    </button>

                    <button

                        type="button"

                        onClick={startMint}

                        disabled={

                            !config.contract ||

                            !config.functionName ||

                            config.abi.length === 0

                        }

                        className={`px-6 py-3 rounded-xl font-semibold transition ${
                            !config.contract ||
                            !config.functionName ||
                            config.abi.length === 0
                                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700 text-white"
                        }`}

                    >

                        Start Mint

                    </button>

                </div>

            </div>

        </div>

    );

}