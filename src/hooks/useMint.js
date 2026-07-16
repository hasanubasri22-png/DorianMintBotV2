import { useState } from "react";

export default function useMint() {

    const [running, setRunning] = useState(false);

    const [success, setSuccess] = useState(0);

    const [failed, setFailed] = useState(0);

    const [currentWallet, setCurrentWallet] = useState(null);

    const [currentTx, setCurrentTx] = useState("");

    return {

        running,
        setRunning,

        success,
        setSuccess,

        failed,
        setFailed,

        currentWallet,
        setCurrentWallet,

        currentTx,
        setCurrentTx

    };

}