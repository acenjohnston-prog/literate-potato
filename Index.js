const WebSocket = require('ws');
const net = require('net');

// Configuration from Render environment variables
const REMOTE_HOST = process.env.REMOTE_HOST || '136.243.83.105';
const REMOTE_PORT = parseInt(process.env.REMOTE_PORT || '22815', 10);
const PORT = parseInt(process.env.PORT || '10000', 10);

const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`Universal Bridge Active on Port ${PORT}`);
    console.log(`Forwarding Eaglercraft traffic to Multi-Protocol Server -> ${REMOTE_HOST}:${REMOTE_PORT}`);
});

wss.on('connection', (ws) => {
    console.log('Eaglercraft browser client connected. Initializing network tunnel...');

    const client = new net.Socket();
    
    // Connect directly to the main FalixNodes port
    client.connect(REMOTE_PORT, REMOTE_HOST, () => {
        console.log('Connected to FalixNodes multi-protocol network pipeline.');
    });

    // Stream browser packets directly to the server
    ws.on('message', (message, isBinary) => {
        const data = isBinary ? message : Buffer.from(message);
        if (client.writable) {
            client.write(data);
        }
    });

    // Stream server packets back to the web browser
    client.on('data', (data) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(data, { binary: true });
        }
    });

    ws.on('close', () => {
        console.log('Eaglercraft client disconnected.');
        client.destroy();
    });

    client.on('close', () => {
        console.log('FalixNodes server dropped the pipeline.');
        ws.close();
    });

    ws.on('error', (err) => console.error('Tunnel WebSocket Error:', err.message));
    client.on('error', (err) => console.error('Tunnel Java Socket Error:', err.message));
});
    });

    ws.on('close', () => {
        console.log('Eaglercraft client disconnected.');
        client.destroy();
    });

    client.on('close', () => {
        console.log('FalixNodes server dropped the pipeline.');
        ws.close();
    });

    ws.on('error', (err) => console.error('Tunnel WebSocket Error:', err.message));
    client.on('error', (err) => console.error('Tunnel Java Socket Error:', err.message));
});
    });

    ws.on('close', () => {
        console.log('Eaglercraft client disconnected.');
        client.destroy();
    });

    client.on('close', () => {
        console.log('FalixNodes server dropped the pipeline.');
        ws.close();
    });

    ws.on('error', (err) => console.error('Tunnel WebSocket Error:', err.message));
    client.on('error', (err) => console.error('Tunnel Java Socket Error:', err.message));
});
