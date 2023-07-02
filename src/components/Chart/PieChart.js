export default function PieChart({ r = 20, per = 1, stroke = "yellowgreen" }) {
  const t = r * Math.PI * 2;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${r * 3} ${r * 3}`}>
      <circle
        cx={(r * 3) / 2}
        cy={(r * 3) / 2}
        r={`${r}`}
        stroke="#d9d9d9"
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx={(r * 3) / 2}
        cy={(r * 3) / 2}
        r={`${r}`}
        strokeDasharray={`${t * per} ${t * (1 - per)}`}
        strokeDashoffset={t * (90 / 360)}
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        x={(r * 3) / 2}
        y={(r * 3) / 2}
        fontSize="6"
      >
        {(per * 100).toFixed(2)}%
      </text>
    </svg>
  );
}
