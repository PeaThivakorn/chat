// เริ่มต้นการเชื่อมต่อกับ Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhY2moqT78c63vjGCDYr4LcQwia35_V_A",
    authDomain: "chatgray-56ce4.firebaseapp.com",
    projectId: "chatgray-56ce4",
    storageBucket: "chatgray-56ce4.firebasestorage.app",
    messagingSenderId: "931095586310",
    appId: "1:931095586310:web:8302d33d1cbdb282e24587",
    measurementId: "G-VSC2J7J756"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ฟังก์ชันตรวจสอบรูปแบบรหัสผ่าน
function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordPattern.test(password);
}

// การส่งฟอร์มสมัครสมาชิก
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault(); // ป้องกันการส่งฟอร์มตามปกติ

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (username && password) {
        // ตรวจสอบความปลอดภัยของรหัสผ่าน
        if (!validatePassword(password)) {
            Swal.fire({
                icon: 'warning',
                title: 'Weak Password',
                text: 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.',
            });
            return; // หยุดกระบวนการถ้ารหัสผ่านไม่ตรงตามเงื่อนไข
        }

        const userRef = ref(database, 'users/' + username);

        // ตรวจสอบว่าชื่อผู้ใช้มีอยู่แล้วหรือไม่
        get(child(ref(database), 'users/' + username))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // ใช้ SweetAlert2 แสดงข้อความว่า "ชื่อผู้ใช้มีอยู่แล้ว"
                    Swal.fire({
                        icon: 'error',
                        title: 'Username is already taken',
                        text: 'Please choose another one.',
                    });
                } else {
                    // บันทึกข้อมูลผู้ใช้ในฐานข้อมูล Firebase โดยไม่ทำการแฮชรหัสผ่าน
                    set(userRef, {
                        username: username,
                        password: password
                    })
                        .then(() => {
                            // ใช้ SweetAlert2 เพื่อแสดงข้อความสำเร็จ
                            Swal.fire({
                                icon: 'success',
                                title: 'Registration Successful!',
                                text: 'Do you want to go to the login page?',
                                showCancelButton: true,
                                confirmButtonText: 'Yes, Go to Login',
                                cancelButtonText: 'No, Stay Here',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // ถ้าเลือก "Yes, Go to Login" จะไปหน้า Login
                                    window.location.href = '/login.html'; // เปลี่ยน URL ให้เป็นหน้า login ของคุณ
                                } else {
                                    // ถ้าเลือก "No, Stay Here" จะล้างฟอร์ม
                                    document.getElementById('registerUsername').value = "";
                                    document.getElementById('registerPassword').value = "";
                                }
                            });
                        })
                        .catch((error) => {
                            // ใช้ SweetAlert2 แสดงข้อผิดพลาด
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'There was an error: ' + error.message,
                            });
                        });
                }
            })
            .catch((error) => {
                // ใช้ SweetAlert2 แสดงข้อผิดพลาด
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error: ' + error.message,
                });
            });
    } else {
        // ใช้ SweetAlert2 ถ้าผู้ใช้ไม่กรอกข้อมูล
        Swal.fire({
            icon: 'warning',
            title: 'Please fill in all fields',
            text: 'Both fields are required to register.',
        });
    }
});