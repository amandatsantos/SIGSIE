import { PieChart, Pie, Cell, Legend } from 'recharts';

const CircularChart = ({ percentage, color }) => {
    const data = [
        { name: 'Atingido', value: percentage },
        { name: 'Restante', value: 100 - percentage }
    ];

    const COLORS = [color, "#eee"]; // Cor personalizada e cor do fundo

    return (
        <PieChart width={120} height={170}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={50}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
        </PieChart>
    );
};

export default CircularChart;
