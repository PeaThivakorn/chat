const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// สร้าง Express App และเซิร์ฟเวอร์ HTTP
const app = express();
const server = http.createServer(app);

// ตั้งค่า WebSocket Server
const wss = new WebSocket.Server({ server });

// เส้นทางสำหรับให้บริการไฟล์ static
app.use(express.static('public')); // public คือโฟลเดอร์ที่เก็บ index.html, styles.css, script.js

// จัดการการเชื่อมต่อ WebSocket
wss.on('connection', (ws) => {
    console.log('ผู้ใช้เชื่อมต่อ WebSocket');

    // รับข้อความจากไคลเอนต์
    ws.on('message', (message) => {
        console.log(`ข้อความจากไคลเอนต์: ${message}`);

        // กระจายข้อความไปยังผู้ใช้คนอื่น
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // จัดการการตัดการเชื่อมต่อ
    ws.on('close', () => {
        console.log('ผู้ใช้ตัดการเชื่อมต่อ');
    });
});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`เซิร์ฟเวอร์กำลังทำงานบนพอร์ต ${PORT}`);
});
