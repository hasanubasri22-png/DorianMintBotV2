export default function MintControl({

    onStart,

    onStop,

    running

}){

    return(

        <div className="flex gap-4">

            <button

                onClick={onStart}

                disabled={running}

                className="bg-green-600 px-5 py-2 rounded"

            >

                Start Mint

            </button>

            <button

                onClick={onStop}

                disabled={!running}

                className="bg-red-600 px-5 py-2 rounded"

            >

                Stop

            </button>

        </div>

    );

}