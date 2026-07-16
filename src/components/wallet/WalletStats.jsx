export default function WalletStats({ wallets }) {

    const total = wallets.length;

    const ready = wallets.filter(
        w => w.status === "Ready"
    ).length;

    const low = wallets.filter(
        w => w.status === "Low Balance"
    ).length;

    const invalid = wallets.filter(
        w => w.status === "Invalid Key"
    ).length;

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 20,
                marginBottom: 20
            }}
        >

            <Card title="Total Wallet" value={total} />

            <Card title="Ready" value={ready} />

            <Card title="Low Balance" value={low} />

            <Card title="Invalid" value={invalid} />

        </div>

    );

}

function Card({ title, value }) {

    return (

        <div
            style={{
                background: "#1f2937",
                color: "white",
                padding: 20,
                borderRadius: 10
            }}
        >

            <div>{title}</div>

            <h2>{value}</h2>

        </div>

    );

}