export default function MintStatus({

    running,

    success,

    failed,

    currentWallet,

    currentTx

}){

    return(

        <div className="bg-gray-800 rounded-xl p-6">

            <h2 className="text-xl font-bold mb-4">

                Mint Status

            </h2>

            <p>

                Status :

                <b>

                    {running ? " Running" : " Idle"}

                </b>

            </p>

            <p>

                Success : {success}

            </p>

            <p>

                Failed : {failed}

            </p>

            <p>

                Wallet :

                {currentWallet?.address || "-"}

            </p>

            <p>

                TX :

                {currentTx || "-"}

            </p>

        </div>

    );

}