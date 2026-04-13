import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const SPIKE_DATA = [
  { month: 'Jan', price: 78 },
  { month: 'Feb', price: 82 },
  { month: 'Mar', price: 91 },
];

export function ChartSpike() {
  return (
    <div className="w-full max-w-[400px] h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={SPIKE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--text-muted)" />
          <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fill: 'var(--text-secondary)' }} />
          <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-secondary)' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-panel)',
              border: '1px solid var(--border-structural)',
              color: 'var(--text-primary)',
            }}
          />
          <Line type="monotone" dataKey="price" stroke="var(--accent)" strokeWidth={2} dot={{ r: 4, fill: 'var(--accent)' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
