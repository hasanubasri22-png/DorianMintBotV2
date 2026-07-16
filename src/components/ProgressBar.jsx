export default function ProgressBar({ percent }) {
  return (
    <div
      style={{
        width: "100%",
        height: 18,
        background: "#374151",
        borderRadius: 50,
        overflow: "hidden",
        marginTop: 25,
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: "#2563EB",
          transition: ".3s",
        }}
      />
    </div>
  );
}