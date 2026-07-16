import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import LogViewer from "../components/LogViewer";

export default function Dashboard() {
  return (
    <>
      <h1
        style={{
          marginBottom: 30,
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <StatCard
          title="Wallet Loaded"
          value="100"
          color="#60A5FA"
        />

        <StatCard
          title="Success"
          value="0"
          color="#22C55E"
        />

        <StatCard
          title="Failed"
          value="0"
          color="#EF4444"
        />

        <StatCard
          title="Pending"
          value="100"
          color="#FACC15"
        />
      </div>

      <ProgressBar percent={0} />

      <LogViewer />
    </>
  );
}