export default function WalletToolbar() {
    return (
        <div className="flex flex-wrap gap-3">

            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">
                Import TXT
            </button>

            <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition">
                Import CSV
            </button>

            <button className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white transition">
                Refresh Balance
            </button>

            <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">
                Clear
            </button>

        </div>
    );
}