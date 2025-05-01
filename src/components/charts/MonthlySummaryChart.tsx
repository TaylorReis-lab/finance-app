// src/components/charts/MonthlySummaryChart.tsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const data = [
  { date: 'Jan', income: 3000, expenses: 1800 },
  { date: 'Feb', income: 3200, expenses: 2000 },
  { date: 'Mar', income: 2800, expenses: 2200 },
];

const MonthlySummaryChart = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Resumo Mensal
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="income" stroke="#4caf50" name="Receita" />
          <Line type="monotone" dataKey="expenses" stroke="#f44336" name="Despesas" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default MonthlySummaryChart;
