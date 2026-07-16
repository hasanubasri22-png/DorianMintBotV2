export default function StatCard({ title, value, color = "#ffffff" }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#1f2937",
        borderRadius: 12,
        padding: 20,
        color: "white",
        minWidth: 180,
      }}
    >
      <div
        style={{
          color: "#9CA3AF",
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 34,
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}