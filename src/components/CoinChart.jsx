import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CoinChart = ( {chart} ) => {

  const formattedData = chart.map(([timestamp, price]) => {
    const date = new Date(timestamp);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' }); // 'Mon', 'Tue', ...
    return { date: day, price: price.toFixed(2) };
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={formattedData} >
        <XAxis dataKey="date" stroke="#000000" />
        <YAxis domain={['auto', 'auto']} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(val) => `$${parseFloat(val).toLocaleString()}`} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#505f55ff"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CoinChart;

/*
📊 Summary:
Component:	Purpose
ResponsiveContainer	:Makes chart responsive to screen size
LineChart:	Holds the chart and data
XAxis:	Displays days of the week
YAxis:	Shows price values in compact $xxxk format
Tooltip	:Shows full value on hover
Line:	Plots the actual price line

{['auto', 'auto']}  : Automatically adjusts the min & max values based on the data
*/ 
