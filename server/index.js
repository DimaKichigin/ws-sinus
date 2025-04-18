const WebSocket = require('ws');

const PORT = 8080;
const serverWs = new WebSocket.Server({ port: PORT });

console.log(`Server started on PORT = ${PORT}`)

serverWs.on('connection', server => {
	console.log('Connection open')
	let time = 0;
	const interval = setInterval(() => {
		const value = Math.sin(time);
	    server.send(JSON.stringify({ time, value }));
	    time += 0.1;
	}, 10);

	server.on('close', () => {
		console.log('Connection close')
	    clearInterval(interval);
	});
});
