import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export function Sinus() {
	const [data, setData] = useState([]);
  	const server = useRef(null);

  	useEffect(() => {
    	server.current = new WebSocket('ws://localhost:8080');

    	server.current.onmessage = (event) => {
      		const point = JSON.parse(event.data);
      		setData(prev => [...prev.slice(-100), point]); 
    	};

    return () => server.current.close();
  	}, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sinus graph</h1>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="t" />
        <YAxis domain={[-1, 1]} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
      </LineChart>
    </div>
  );
}
