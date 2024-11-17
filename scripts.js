// เลือกองค์ประกอบ HTML
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const userContent = document.getElementById('userContent');

// ฟังก์ชันอัปเดต max-height ของ userContent
function updateContentHeight() {
    const messages = userContent.querySelectorAll('.message');
    if (messages.length >= 6) {
        userContent.style.maxHeight = '315px'; // กำหนดความสูงเมื่อมีข้อความ 6 ข้อความขึ้นไป
    } else {
        userContent.style.maxHeight = 'none'; // ไม่มีการจำกัดความสูง
    }
}

// ฟังก์ชันเลื่อนกล่องข้อความไปที่ข้อความล่าสุด
function scrollToLatestMessage() {
    userContent.scrollTop = userContent.scrollHeight;
}

// เพิ่ม event listener ให้กับปุ่ม
sendButton.addEventListener('click', function () {
    const text = userInput.value.trim(); // รับข้อความและลบช่องว่าง
    if (text !== '') {
        // สร้าง element สำหรับข้อความใหม่
        const message = document.createElement('div');
        message.classList.add('message');

        // เพิ่มข้อความผู้ใช้งาน
        const messageText = document.createElement('span');
        messageText.textContent = text;

        // เพิ่มวันที่และเวลา
        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        const now = new Date();
        timestamp.textContent = `ส่งเมื่อ: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

        // เพิ่มข้อความและ timestamp ลงใน message
        message.appendChild(messageText);
        message.appendChild(timestamp);

        // เพิ่มข้อความใหม่ลงใน userContent
        userContent.appendChild(message);

        // ล้างช่องกรอกข้อความ
        userInput.value = '';

        // อัปเดตความสูงของ userContent
        updateContentHeight();

        // เลื่อนกล่องข้อความไปที่ข้อความล่าสุด
        scrollToLatestMessage();
    } else {
        alert('กรุณากรอกข้อความก่อนส่ง');
    }
});

